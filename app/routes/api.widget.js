import prisma from "../db.server";
import shopify from "../shopify.server";

// Dynamic preloaded testimonials for new stores to guarantee it works out of the box
const DEFAULT_TESTIMONIALS = [
  {
    authorName: "Sarah Jenkins",
    designation: "Founder, TechFlow",
    rating: 5,
    quote: "This product has completely transformed our workflow. The setup was effortless, and the customer support has been stellar. Highly recommended to anyone looking to scale!",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    order: 0,
  },
  {
    authorName: "David Chen",
    designation: "Product Lead, Apex Labs",
    rating: 5,
    quote: "The visual fidelity and customization of TestiCraft are unmatched. We've seen a noticeable 18% increase in conversion rates since adding these testimonial sections to our product pages.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    order: 1,
  },
  {
    authorName: "Elena Rostova",
    designation: "Marketing Director, Lumina",
    rating: 4,
    quote: "Elegant designs, mobile responsiveness, and micro-animations that feel premium. The glassmorphism card looks absolutely stunning on our checkout page!",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    order: 2,
  }
];

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  let shop = url.searchParams.get("shop");

  if (!shop) {
    return Response.json({ error: "Missing shop parameter" }, { status: 400 });
  }

  // Sanitize shop name to match standard format
  if (!shop.includes(".myshopify.com")) {
    shop = `${shop}.myshopify.com`;
  }

  // 1. Get or create the Testimonial Widget for this shop
  let widget = await prisma.testimonialWidget.findUnique({
    where: { shop },
    select: {
      id: true,
      activeDesign: true,
      heading: true,
      subheading: true,
      fontFamily: true,
      textColor: true,
      accentColor: true,
      cardBgColor: true,
      sectionBgColor: true,
      columns: true,
      testimonials: {
        select: {
          id: true,
          authorName: true,
          designation: true,
          rating: true,
          quote: true,
          avatarUrl: true,
        },
        orderBy: { order: "asc" },
      },
    },
  });

  if (!widget) {
    widget = await prisma.testimonialWidget.create({
      data: {
        shop,
        activeDesign: "design-1",
        heading: "What Our Customers Say",
        subheading: "Hear directly from the people who love our products.",
        fontFamily: "Inter",
        textColor: "#1f2937",
        accentColor: "#f59e0b",
        cardBgColor: "#ffffff",
        sectionBgColor: "#f9fafb",
        columns: 3,
        testimonials: {
          create: DEFAULT_TESTIMONIALS,
        },
      },
      include: { testimonials: { orderBy: { order: "asc" } } },
    });
  }

  // 2. Fetch the merchant's active billing tier in real-time
  let activeTier = "Free";
  try {
    const { billing } = await shopify.unauthenticated.admin(shop);
    const billingCheck = await billing.check({
      plans: ["Tier 1", "Tier 2", "Tier 3"],
      isTest: true,
    });

    if (billingCheck.hasActivePayment && billingCheck.appSubscriptions.length > 0) {
      activeTier = billingCheck.appSubscriptions[0].name; // "Tier 1", "Tier 2", "Tier 3"
    }
  } catch (error) {
    console.warn("Failed to check active billing tier for storefront widget:", error.message);
    // Silent fallback to Free tier ensures the storefront widget never crashes
    activeTier = "Free";
  }

  // 3. Securely validate design restrictions on the backend
  let activeDesign = widget.activeDesign;
  
  if (activeTier === "Free") {
    // Free tier can only use design-1
    activeDesign = "design-1";
  } else if (activeTier === "Tier 1") {
    // Tier 1 ($50) can only use design-1, design-2, design-3
    if (!["design-1", "design-2", "design-3"].includes(activeDesign)) {
      activeDesign = "design-1";
    }
  } else if (activeTier === "Tier 2") {
    // Tier 2 ($70) can use design-1 to design-5
    if (!["design-1", "design-2", "design-3", "design-4", "design-5"].includes(activeDesign)) {
      activeDesign = "design-1";
    }
  }
  // Tier 3 ($100) can use all layouts (design-1 to design-7)

  // 4. Return clean payload for storefront rendering with CORS enabled for convenience
  return Response.json(
    {
      widget: {
        ...widget,
        activeDesign, // Secure backend overridden design
      },
      activeTier,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Cache-Control": "public, max-age=15, stale-while-revalidate=60", // Faster edge cache
      },
    }
  );
};

export const action = async () => {
  return Response.json({ error: "Method not allowed" }, { status: 405 });
};
