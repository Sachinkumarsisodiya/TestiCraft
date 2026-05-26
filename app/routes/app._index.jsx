import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, Form } from "react-router";
import { Page, Text, BlockStack, InlineStack, Button, Grid, Icon, Modal } from "@shopify/polaris";
import { LockIcon, ViewIcon } from "@shopify/polaris-icons";
import prisma from "../db.server";
import shopify from "../shopify.server";
import widgetStyles from "../styles/widget.css?url";
import { TestiCraftLogo } from "../components/TestiCraftLogo";
import { PLANS, TEMPLATE_CATEGORIES, getUpgradeTarget, isTemplateLocked } from "../constants/plans";

export const links = () => [{ rel: "stylesheet", href: widgetStyles }];


// Avatar presets for live preview mock data
const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
];

export const loader = async ({ request }) => {
  const { session, billing } = await shopify.authenticate.admin(request);
  const shop = session.shop;

  let activeTier = "Free";
  try {
    const billingCheck = await billing.check({
      plans: ["Tier 1", "Tier 2", "Tier 3"],
      isTest: true,
    });
    if (billingCheck.hasActivePayment && billingCheck.appSubscriptions.length > 0) {
      activeTier = billingCheck.appSubscriptions[0].name;
    }
  } catch (error) {
    activeTier = "Free";
  }

  const widget = await prisma.testimonialWidget.findUnique({
    where: { shop },
    include: { testimonials: { orderBy: { order: "asc" } } },
  });

  return { widget, activeTier, shop };
};

export const action = async ({ request }) => {
  const { session } = await shopify.authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "UPDATE_DESIGN") {
    await prisma.testimonialWidget.upsert({
      where: { shop: session.shop },
      update: { activeDesign: formData.get("activeDesign") },
      create: {
        shop: session.shop,
        activeDesign: formData.get("activeDesign"),
      },
    });
    return { success: true, message: "Design template activated!" };
  }

  return null;
};

export default function Dashboard() {
  const { widget, activeTier } = useLoaderData();
  const fetcher = useFetcher();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewDesign, setPreviewDesign] = useState("design-1");
  const [previewDevice, setPreviewDevice] = useState("desktop");
  
  const heading = widget?.heading || "";
  const subheading = widget?.subheading || "";
  const fontFamily = widget?.fontFamily || "Inter";
  const textColor = widget?.textColor || "#1f2937";
  const accentColor = widget?.accentColor || "#f59e0b";
  const cardBgColor = widget?.cardBgColor || "#ffffff";
  const sectionBgColor = widget?.sectionBgColor || "#f9fafb";
  const items = widget?.testimonials || [];

  useEffect(() => {
    if (fetcher.data?.success && fetcher.state === "idle" && fetcher.formMethod === "POST") {
      shopify.toast.show(fetcher.data.message || "Saved successfully");
    }
  }, [fetcher.data, fetcher.state, fetcher.formMethod]);

  const handleSaveDesign = (designId) => {
    const formData = new FormData();
    formData.append("intent", "UPDATE_DESIGN");
    formData.append("activeDesign", designId);
    fetcher.submit(formData, { method: "POST" });
  };

  // Use centralized helper from constants/plans.js
  const upgrade = getUpgradeTarget(activeTier);
  const activePlan = PLANS[activeTier] || PLANS["Free"];

  const isSaving = fetcher.state !== "idle";

  // MOCK CSS-BASED THEME PREVIEWS FOR CARDS (Refined GPU-friendly rendering)
  const renderCardThemeMock = (designId, locked, lockPlanName) => {
    let mockContent = null;

    if (designId === "design-1" || designId === "design-2") {
      mockContent = (
        <div style={{ width: "80%", height: "80%", background: "#fff", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px", display: "flex", flexDirection: "column", gap: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", margin: "auto" }}>
          <div style={{ height: "8px", background: "#f59e0b", width: "40px", borderRadius: "4px", alignSelf: "center", marginBottom: "8px" }} />
          <div style={{ height: "6px", background: "#e5e7eb", width: "100%", borderRadius: "4px" }} />
          <div style={{ height: "6px", background: "#e5e7eb", width: "90%", borderRadius: "4px" }} />
          <div style={{ height: "6px", background: "#e5e7eb", width: "60%", borderRadius: "4px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#cbd5e1" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", justifyContent: "center" }}>
              <div style={{ height: "4px", background: "#94a3b8", width: "40px", borderRadius: "2px" }} />
              <div style={{ height: "4px", background: "#cbd5e1", width: "30px", borderRadius: "2px" }} />
            </div>
          </div>
        </div>
      );
    } else if (designId === "design-3" || designId === "design-4") {
      mockContent = (
        <div style={{ display: "flex", gap: "12px", width: "90%", margin: "auto" }}>
          <div style={{ flex: 1, background: "linear-gradient(180deg, #fff 0%, #f9fafb 100%)", borderRadius: "8px", borderTop: "2px solid #3b82f6", padding: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#cbd5e1" }} />
            <div style={{ height: "6px", background: "#e5e7eb", width: "100%", borderRadius: "4px" }} />
            <div style={{ height: "6px", background: "#e5e7eb", width: "70%", borderRadius: "4px" }} />
          </div>
          <div style={{ flex: 1, background: "linear-gradient(180deg, #fff 0%, #f9fafb 100%)", borderRadius: "8px", borderTop: "2px solid #8b5cf6", padding: "16px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "8px", opacity: 0.6 }}>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#cbd5e1" }} />
            <div style={{ height: "6px", background: "#e5e7eb", width: "100%", borderRadius: "4px" }} />
            <div style={{ height: "6px", background: "#e5e7eb", width: "70%", borderRadius: "4px" }} />
          </div>
        </div>
      );
    } else if (designId === "design-5" || designId === "design-6") {
      mockContent = (
        <div style={{ width: "90%", height: "90%", margin: "auto", position: "relative" }}>
          <div style={{ position: "absolute", top: "10%", left: "10%", width: "80%", height: "80%", background: "#8b5cf6", opacity: 0.15, borderRadius: "50%" }} />
          <div style={{ position: "absolute", inset: "10%", background: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: "12px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
             <div style={{ height: "6px", background: "#c4b5fd", width: "30%", borderRadius: "4px" }} />
             <div style={{ height: "6px", background: "#e2e8f0", width: "100%", borderRadius: "4px" }} />
             <div style={{ height: "6px", background: "#e2e8f0", width: "80%", borderRadius: "4px" }} />
             <div style={{ display: "flex", gap: "8px", marginTop: "auto" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "#a78bfa" }} />
                <div style={{ height: "6px", background: "#cbd5e1", width: "40%", borderRadius: "4px", alignSelf: "center" }} />
             </div>
          </div>
        </div>
      );
    } else {
      mockContent = (
        <div style={{ width: "100%", height: "100%", display: "flex", gap: "12px", alignItems: "center", justifyContent: "center", background: "#0f172a" }}>
          <div style={{ width: "80px", height: "120px", background: "linear-gradient(145deg, #1e293b, #0f172a)", borderRadius: "8px", transform: "perspective(400px) rotateY(15deg)", boxShadow: "0 15px 25px rgba(0,0,0,0.5)", border: "1px solid #334155", padding: "12px" }}>
            <div style={{ height: "4px", background: "#fbbf24", width: "30%", borderRadius: "2px", marginBottom: "8px" }} />
            <div style={{ height: "4px", background: "#475569", width: "100%", borderRadius: "2px", marginBottom: "4px" }} />
            <div style={{ height: "4px", background: "#475569", width: "80%", borderRadius: "2px" }} />
          </div>
          <div style={{ width: "90px", height: "140px", background: "linear-gradient(145deg, #1e293b, #0f172a)", borderRadius: "8px", transform: "perspective(400px) translateZ(20px)", boxShadow: "0 0 40px rgba(245,158,11,0.2), 0 20px 30px rgba(0,0,0,0.6)", border: "1px solid #475569", padding: "12px", zIndex: 10 }}>
            <div style={{ height: "4px", background: "#fbbf24", width: "40%", borderRadius: "2px", marginBottom: "12px", margin: "0 auto" }} />
            <div style={{ height: "4px", background: "#94a3b8", width: "100%", borderRadius: "2px", marginBottom: "6px" }} />
            <div style={{ height: "4px", background: "#94a3b8", width: "90%", borderRadius: "2px", marginBottom: "6px" }} />
            <div style={{ height: "4px", background: "#94a3b8", width: "60%", borderRadius: "2px" }} />
          </div>
        </div>
      );
    }

    return (
      <div style={{ height: "160px", background: designId.includes("7") || designId.includes("8") ? "#0f172a" : "#f8fafc", position: "relative", display: "flex", overflow: "hidden" }}>
        {mockContent}
        {locked && (
          <div style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", zIndex: 20
          }}>
            <div style={{ color: "#ffffff", display: "flex" }}>
              <Icon source={LockIcon} tone="inherit" />
            </div>
            <div style={{ color: "#ffffff", fontWeight: "700", fontSize: "0.85rem", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
              Unlock with {lockPlanName} plan
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLivePreview = () => {
    const designId = previewDesign || "design-1";

    const MOCK_ITEMS = [
      { id: "m1", authorName: "Sarah Jenkins", designation: "Verified Buyer", rating: 5, quote: "Absolutely incredible! The quality of this product exceeded all my expectations. My store conversion rate jumped 24% in the first week.", avatarUrl: AVATAR_PRESETS[0] },
      { id: "m2", authorName: "David Chen", designation: "Store Owner", rating: 5, quote: "The best investment I've made for my business this year. The premium feel is unmatched by any competitors.", avatarUrl: AVATAR_PRESETS[1] },
      { id: "m3", authorName: "Emily Rodriguez", designation: "Verified Buyer", rating: 5, quote: "Beautifully designed and extremely easy to use. I highly recommend this to anyone looking to scale their social proof.", avatarUrl: AVATAR_PRESETS[2] },
      { id: "m4", authorName: "Michael Chang", designation: "CEO", rating: 5, quote: "Our customers constantly compliment the clean aesthetics. It perfectly matches our luxury brand identity.", avatarUrl: AVATAR_PRESETS[3] },
      { id: "m5", authorName: "Jessica Albon", designation: "Verified Buyer", rating: 5, quote: "I was skeptical at first, but the results speak for themselves. The 3D animations are stunning on mobile.", avatarUrl: AVATAR_PRESETS[4] },
      { id: "m6", authorName: "Marcus Thorne", designation: "Verified Buyer", rating: 5, quote: "Five stars! The setup was instant and it completely transformed the look and feel of my landing pages.", avatarUrl: AVATAR_PRESETS[5] }
    ];

    const previewItems = items.length >= 3 ? items : (items.length > 0 ? [...items, ...MOCK_ITEMS.slice(items.length)] : MOCK_ITEMS);

    const quoteIcon = (
      <svg className="testicraft-quote-icon" width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.017 21L16.439 14.99H11.5V3H21.5V14.99L19.078 21H14.017ZM2.517 21L4.939 14.99H0V3H10V14.99L7.578 21H2.517Z" />
      </svg>
    );

    const getStars = (rating) => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <svg key={i} className={i <= rating ? "testicraft-star-filled" : "testicraft-star-empty"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        );
      }
      return stars;
    };

    let gridContent;

    switch (designId) {
      case "design-1":
        gridContent = (
          <div className="testicraft-d1-grid">
            {previewItems.map(item => (
              <div key={item.id} className="testicraft-d1-card">
                <img className="testicraft-d1-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                <h4 className="testicraft-d1-name">{item.authorName}</h4>
                <span className="testicraft-d1-role">{item.designation}</span>
                <p className="testicraft-d1-quote">&quot;{item.quote}&quot;</p>
                <div className="testicraft-d1-stars">{getStars(item.rating)}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "design-2":
        gridContent = (
          <div className="testicraft-d2-grid">
            {previewItems.map(item => (
              <div key={item.id} className="testicraft-d2-card">
                <div className="testicraft-d2-avatar-wrap">
                  <img className="testicraft-d2-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                </div>
                <div className="testicraft-d2-stars" style={{ alignSelf: "flex-end" }}>{getStars(item.rating)}</div>
                <p className="testicraft-d2-quote">&quot;{item.quote}&quot;</p>
                <div className="testicraft-d2-author">
                  <div>
                    <h4 className="testicraft-d2-name">{item.authorName}</h4>
                    <span className="testicraft-d2-role">{item.designation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "design-3":
        gridContent = (
          <div className="testicraft-d3-grid">
            {previewItems.map(item => (
              <div key={item.id} className="testicraft-d3-card">
                {quoteIcon}
                <div className="testicraft-d3-header">
                  <img className="testicraft-d3-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                  <div>
                    <h4 className="testicraft-d3-name">{item.authorName}</h4>
                    <span className="testicraft-d3-role">{item.designation}</span>
                  </div>
                </div>
                <p className="testicraft-d3-quote">&quot;{item.quote}&quot;</p>
                <div className="testicraft-stars" style={{ marginTop: "20px" }}>{getStars(item.rating)}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "design-4":
        gridContent = (
          <div className="testicraft-d4-wrapper">
            {previewItems.map(item => (
              <div key={item.id} className="testicraft-d4-card">
                <div className="testicraft-stars" style={{ marginBottom: "20px" }}>{getStars(item.rating)}</div>
                <p className="testicraft-d4-quote">&quot;{item.quote}&quot;</p>
                <div className="testicraft-d4-author">
                  <img className="testicraft-d4-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                  <div>
                    <h4 className="testicraft-d4-name">{item.authorName}</h4>
                    <span className="testicraft-d1-role">{item.designation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "design-5":
        gridContent = (
          <div className="testicraft-d5-container">
            <div className="testicraft-d5-grid">
              {previewItems.map(item => (
                <div key={item.id} className="testicraft-d5-card">
                  <p className="testicraft-d5-quote">&quot;{item.quote}&quot;</p>
                  <div className="testicraft-d5-footer">
                    <div className="testicraft-d5-author">
                      <img className="testicraft-d5-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                      <div>
                        <h4 className="testicraft-d5-name">{item.authorName}</h4>
                        <div className="testicraft-d5-stars">{getStars(item.rating)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "design-6":
        gridContent = (
          <div className="testicraft-d6-masonry">
            {previewItems.map(item => (
              <div key={item.id} className="testicraft-d6-card">
                <div className="testicraft-d6-header">
                  <div className="testicraft-d6-author">
                    <img className="testicraft-d6-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                    <div className="testicraft-d6-name-wrap">
                      <h4 className="testicraft-d6-name">{item.authorName}</h4>
                      <span className="testicraft-d6-role">{item.designation}</span>
                    </div>
                  </div>
                  <div className="testicraft-stars">{getStars(item.rating)}</div>
                </div>
                <p className="testicraft-d6-quote">&quot;{item.quote}&quot;</p>
              </div>
            ))}
          </div>
        );
        break;

      case "design-7":
        gridContent = (
          <div className="testicraft-d7-grid">
            {previewItems.slice(0, 3).map(item => (
              <div key={item.id} className="testicraft-d7-card">
                {quoteIcon}
                <div className="testicraft-stars" style={{ marginBottom: "20px" }}>{getStars(item.rating)}</div>
                <p className="testicraft-d7-quote">&quot;{item.quote}&quot;</p>
                <div className="testicraft-d7-author">
                  <img className="testicraft-d7-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                  <div>
                    <h4 className="testicraft-d7-name">{item.authorName}</h4>
                    <span className="testicraft-d7-role">{item.designation}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "design-8":
        gridContent = (
          <div className="testicraft-d8-grid">
            {previewItems.map(item => (
              <div key={item.id} className="testicraft-d8-card">
                <div className="testicraft-d8-stars" style={{ marginBottom: "20px" }}>{getStars(item.rating)}</div>
                <p className="testicraft-d8-quote">&quot;{item.quote}&quot;</p>
                <div className="testicraft-d8-footer">
                  <div className="testicraft-d8-author">
                    <img className="testicraft-d8-avatar" src={item.avatarUrl} alt="" loading="lazy" />
                    <div>
                      <h4 className="testicraft-d8-name">{item.authorName}</h4>
                      <span className="testicraft-d8-role">{item.designation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      default:
        gridContent = null;
    }

    const previewStyle = {
      "--tc-text": textColor || "#1f2937",
      "--tc-accent": accentColor || "#f59e0b",
      "--tc-bg": cardBgColor || "#ffffff",
      "--tc-section-bg": sectionBgColor || "#f9fafb",
      "--tc-font": fontFamily !== "Inter" ? `'${fontFamily}', system-ui, sans-serif` : undefined,
      margin: "0 auto",
      width: "100%",
      height: "100%",
      backgroundColor: sectionBgColor
    };

    return (
      <div style={previewStyle} className="testicraft-widget-root">
        <section className="testicraft-section">
          <div className="testicraft-container">
            <div className="testicraft-header">
              <h2 className="testicraft-heading">{heading}</h2>
              <p className="testicraft-subheading">{subheading}</p>
            </div>
            {gridContent}
          </div>
        </section>
      </div>
    );
  };

  const renderTemplateMarketplace = () => {
    return (
      <div style={{ marginTop: "16px" }}>
        <BlockStack gap="600">

          <div style={{ marginBottom: "8px" }}>
            <BlockStack gap="100">
              <Text variant="headingLg" as="h2">Choose Your Testimonial Template</Text>
              <Text variant="bodyMd" tone="subdued">Select from 8 premium testimonial designs</Text>
            </BlockStack>
          </div>

          <Grid>
            {TEMPLATE_CATEGORIES.map((cat) => {
              const plan = cat.plan;
              const isMostPopular = plan.isMostPopular;

              return (
                <Grid.Cell key={cat.id} columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                  {/* Most Popular glow wrapper for Growth tier */}
                  <div style={{ position: "relative", height: "100%", paddingTop: isMostPopular ? "20px" : "0" }}>
                    {isMostPopular && (
                      <div style={{
                        position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
                        zIndex: 10, whiteSpace: "nowrap",
                        background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                        color: "#fff", padding: "5px 16px", borderRadius: "20px",
                        fontSize: "0.72rem", fontWeight: "800", letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        boxShadow: "0 4px 18px rgba(124,58,237,0.5)"
                      }}>⭐ Most Popular</div>
                    )}
                    <div style={{
                      background: isMostPopular ? "linear-gradient(160deg, #faf5ff 0%, #f5f3ff 100%)" : "#ffffff",
                      border: isMostPopular ? `2px solid ${plan.color}` : "1px solid #f1f5f9",
                      borderRadius: "20px", padding: "28px",
                      boxShadow: isMostPopular
                        ? `0 8px 32px ${plan.shadowColor}, 0 2px 8px rgba(124,58,237,0.06)`
                        : "0 4px 12px rgba(0,0,0,0.02)",
                      height: "100%",
                      transition: "box-shadow 0.3s ease"
                    }}>
                      {/* Category Header */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", marginTop: isMostPopular ? "8px" : "0" }}>
                        <h3 style={{ color: plan.color, margin: 0, fontSize: "1.2rem", fontWeight: "700", letterSpacing: "-0.01em" }}>{plan.displayName}</h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          {!plan.isFree && <span style={{ color: plan.color, fontWeight: "600", fontSize: "0.9rem" }}>{plan.price}/mo</span>}
                          <span style={{ background: plan.bgColor, color: plan.color, padding: "6px 12px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "800", letterSpacing: "0.05em" }}>
                            {plan.badge}
                          </span>
                        </div>
                      </div>

                      {/* Template Cards */}
                      <div className="tc-template-grid">
                        {cat.templates.map(tpl => {
                          const locked = isTemplateLocked(plan.key, activeTier);
                          const active = widget?.activeDesign === tpl.id;

                          return (
                            <div key={tpl.id} style={{
                              background: "#ffffff",
                              border: active ? "2px solid #10b981" : "1px solid #e2e8f0",
                              borderRadius: "16px", overflow: "hidden",
                              display: "flex", flexDirection: "column",
                              boxShadow: active ? "0 8px 24px rgba(16, 185, 129, 0.15)" : "0 4px 12px rgba(0,0,0,0.03)",
                              transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                              cursor: "pointer",
                              willChange: "transform, box-shadow"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.08)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = active ? "0 8px 24px rgba(16, 185, 129, 0.15)" : "0 4px 12px rgba(0,0,0,0.03)"; }}
                            >
                              {renderCardThemeMock(tpl.id, locked, plan.displayName)}

                              <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                <Text variant="headingMd" as="h4">{tpl.name}</Text>

                                <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap", alignItems: "center" }}>
                                  <Button size="large" icon={ViewIcon} onClick={() => { setPreviewDesign(tpl.id); setPreviewOpen(true); }}>Live Preview</Button>

                                  <div style={{ flex: 1 }}>
                                    {locked ? (
                                      <Form method="POST" action="/api/billing">
                                        <input type="hidden" name="plan" value={upgrade?.plan} />
                                        <button type="submit" style={{ width: "100%", height: "100%", padding: "8px 14px", background: plan.color, color: "#fff", border: "none", borderRadius: "8px", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer", minWidth: "110px", transition: "transform 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", lineHeight: 1.3 }}
                                          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
                                          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                                        >
                                          <span style={{ width: "13px", height: "13px", display: "block", flexShrink: 0 }}><Icon source={LockIcon} tone="inherit" /></span>
                                          {upgrade?.label || `Unlock ${plan.badge}`}
                                        </button>
                                      </Form>
                                    ) : active ? (
                                      <div style={{ width: "100%", padding: "8px 14px", background: "#d1fae5", color: "#10b981", border: "1px solid #10b981", borderRadius: "8px", fontSize: "0.95rem", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                                        ✓ Active
                                      </div>
                                    ) : (
                                      <button type="button" onClick={() => handleSaveDesign(tpl.id)} style={{ width: "100%", padding: "8px 14px", background: "#ffffff", color: "#10b981", border: "1px solid #10b981", borderRadius: "8px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", transition: "transform 0.2s" }}
                                        onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.97)"}
                                        onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
                                      >
                                        ✓ Activate
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Grid.Cell>
              );
            })}
          </Grid>
        </BlockStack>
      </div>
    );
  };

  return (
    <Page fullWidth>
      <BlockStack gap="600">
        
        {/* ── BRANDED PAGE HEADER ── */}
        <div className="tc-dash-header">
          <TestiCraftLogo height={42} />
          <div className="tc-dash-header-divider" style={{ width: "1px", height: "40px", background: "#e2e8f0", flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.2 }}>TestiCraft</div>
            <div style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: "500", marginTop: "2px" }}>Dashboard & Templates</div>
          </div>
        </div>

        {/* PLAN BAR — uses PLANS[activeTier] from centralized constants */}
        {(() => {
          return (
            <div className="tc-plan-bar" style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.95) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(226,232,240,0.8)",
              borderRadius: "16px",
              padding: "16px 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              marginBottom: "8px"
            }}>
              {/* Left: plan info only — no logo here */}
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <div style={{ fontSize: "0.68rem", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  Current Plan
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a", letterSpacing: "-0.01em" }}>
                    {activePlan.displayName}
                  </span>
                  <div style={{
                    background: activePlan.bgColor,
                    color: activePlan.color,
                    border: `1px solid ${activePlan.borderColor}`,
                    padding: "2px 9px",
                    borderRadius: "20px",
                    fontSize: "0.68rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px"
                  }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: activePlan.color, boxShadow: `0 0 5px ${activePlan.color}` }} />
                    Active
                  </div>
                </div>
              </div>

              {/* Right: Upgrade CTA or max plan badge */}
              <div>
                {upgrade ? (
                  <Form method="POST" action="/api/billing">
                    <input type="hidden" name="plan" value={upgrade.plan} />
                    <button type="submit" style={{
                      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(15,23,42,0.15)",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap"
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(15,23,42,0.22)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(15,23,42,0.15)"; }}
                    >
                      {upgrade.label} →
                    </button>
                  </Form>
                ) : (
                  <div style={{
                    background: "rgba(245,158,11,0.1)",
                    color: "#f59e0b",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    border: "1px solid rgba(245,158,11,0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    ⭐ Highest Plan Active
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* TEMPLATE MARKETPLACE DIRECTLY RENDERED */}
        {renderTemplateMarketplace()}

      </BlockStack>

      {/* REALISTIC LIVE PREVIEW MODAL */}
      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        title={null}
        large
      >
        <Modal.Section>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <Text variant="headingMd" as="h2">Storefront Simulation</Text>
              <div style={{ display: "inline-flex", background: "#f1f5f9", padding: "4px", borderRadius: "10px" }}>
                <button onClick={() => setPreviewDevice("desktop")} style={{ padding: "8px 16px", border: "none", background: previewDevice === "desktop" ? "#ffffff" : "transparent", borderRadius: "8px", cursor: "pointer", boxShadow: previewDevice === "desktop" ? "0 2px 8px rgba(0,0,0,0.05)" : "none", fontWeight: "600", color: previewDevice === "desktop" ? "#0f172a" : "#64748b", transition: "all 0.2s" }}>Desktop</button>
                <button onClick={() => setPreviewDevice("mobile")} style={{ padding: "8px 16px", border: "none", background: previewDevice === "mobile" ? "#ffffff" : "transparent", borderRadius: "8px", cursor: "pointer", boxShadow: previewDevice === "mobile" ? "0 2px 8px rgba(0,0,0,0.05)" : "none", fontWeight: "600", color: previewDevice === "mobile" ? "#0f172a" : "#64748b", transition: "all 0.2s" }}>Mobile</button>
              </div>
            </InlineStack>

            <div style={{ 
              background: "#f1f5f9", padding: "16px", borderRadius: "20px", marginTop: "16px", display: "flex", justifyContent: "center",
            }}>
              <div 
                className={previewDevice === "mobile" ? "tc-mobile-sim" : ""}
                style={{
                width: previewDevice === "mobile" ? "375px" : "100%",
                aspectRatio: previewDevice === "mobile" ? "9/19" : "16/9",
                background: "#ffffff",
                borderRadius: previewDevice === "mobile" ? "40px" : "12px",
                border: previewDevice === "mobile" ? "12px solid #0f172a" : "1px solid #e2e8f0",
                overflowY: "auto", overflowX: "hidden",
                boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}>
                {renderLivePreview()}
              </div>
            </div>
          </BlockStack>
        </Modal.Section>
      </Modal>

    </Page>
  );
}
