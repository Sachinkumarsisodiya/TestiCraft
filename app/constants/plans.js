/**
 * TestiCraft — Single Source of Truth for Plan Configuration
 *
 * All tier names, colors, billing IDs, CTA labels, and upgrade paths
 * are defined here. Import from this file everywhere — never hardcode.
 */

// ─────────────────────────────────────────────
// CANONICAL PLAN DEFINITIONS
// ─────────────────────────────────────────────

export const PLANS = {
  Free: {
    key: "Free",
    billingId: "Free",            // Shopify billing plan name
    displayName: "FREE – Starter Spark",
    shortName: "Starter Spark",
    badge: "FREE",
    price: "$0",
    period: "Free forever",
    tagline: "Essential social proof for new stores.",
    color: "#10b981",             // green
    bgColor: "#d1fae5",
    borderColor: "rgba(16,185,129,0.25)",
    shadowColor: "rgba(16,185,129,0.3)",
    features: [
      "2 Standard Templates",
      "Unlimited Testimonials",
      "Basic Customization",
    ],
    isFree: true,
    isDark: false,
    isMostPopular: false,
  },

  "Tier 1": {
    key: "Tier 1",
    billingId: "Tier 1",
    displayName: "STARTER – Growth Boost",
    shortName: "Growth Boost",
    badge: "STARTER",
    price: "$50",
    period: "/ month",
    tagline: "Boost trust with gradient & carousel themes.",
    color: "#3b82f6",             // blue
    bgColor: "#dbeafe",
    borderColor: "rgba(59,130,246,0.25)",
    shadowColor: "rgba(59,130,246,0.3)",
    features: [
      "4 Premium Layouts",
      "Carousel Support",
      "Gradient Flow Design",
    ],
    isFree: false,
    isDark: false,
    isMostPopular: false,
  },

  "Tier 2": {
    key: "Tier 2",
    billingId: "Tier 2",
    displayName: "GROWTH – Authority Plus",
    shortName: "Authority Plus",
    badge: "GROWTH",
    price: "$70",
    period: "/ month",
    tagline: "Modern glassmorphism & authority aesthetics.",
    color: "#8b5cf6",             // purple
    bgColor: "#ede9fe",
    borderColor: "rgba(139,92,246,0.4)",
    shadowColor: "rgba(124,58,237,0.25)",
    features: [
      "6 Premium Layouts",
      "GlassWave Filters",
      "Floating Trust Wall",
    ],
    isFree: false,
    isDark: false,
    isMostPopular: true,          // ⭐ Most Popular — psychologically optimal tier
  },

  "Tier 3": {
    key: "Tier 3",
    billingId: "Tier 3",
    displayName: "PREMIUM – Elite Conversion Suite",
    shortName: "Elite Conversion Suite",
    badge: "PREMIUM",
    price: "$100",
    period: "/ month",
    tagline: "Unlock the full luxury 3D cinematic suite.",
    color: "#f59e0b",             // gold
    bgColor: "#fef3c7",
    borderColor: "rgba(245,158,11,0.35)",
    shadowColor: "rgba(245,158,11,0.3)",
    features: [
      "All 8 Cinematic Layouts",
      "Luxury 3D Transforms",
      "Editorial Spotlight",
    ],
    isFree: false,
    isDark: true,
    isMostPopular: false,
  },
};

// Ordered list of all plan keys for iteration
export const PLAN_ORDER = ["Free", "Tier 1", "Tier 2", "Tier 3"];

// ─────────────────────────────────────────────
// UPGRADE PATHS
// ─────────────────────────────────────────────

/** Returns the next upgrade target plan key, or null if already at max. */
export function getNextPlan(currentTier) {
  const idx = PLAN_ORDER.indexOf(currentTier);
  if (idx === -1 || idx === PLAN_ORDER.length - 1) return null;
  return PLAN_ORDER[idx + 1];
}

/** Returns the full upgrade CTA label for a given current tier. */
export function getUpgradeLabel(currentTier) {
  const next = getNextPlan(currentTier);
  if (!next) return null;
  return `Upgrade to ${PLANS[next].displayName}`;
}

/** Returns the upgrade CTA object { label, plan } or null if maxed out. */
export function getUpgradeTarget(currentTier) {
  const next = getNextPlan(currentTier);
  if (!next) return null;
  return {
    plan: PLANS[next].billingId,
    label: `Upgrade to ${PLANS[next].displayName}`,
    displayName: PLANS[next].displayName,
  };
}

// ─────────────────────────────────────────────
// DESIGN TEMPLATE → TIER MAPPING
// ─────────────────────────────────────────────

export const DESIGN_TEMPLATES = [
  { id: "design-1", name: "1. Clean Classic",         tier: "Free"   },
  { id: "design-2", name: "2. Soft Minimal",           tier: "Free"   },
  { id: "design-3", name: "3. Gradient Flow",          tier: "Tier 1" },
  { id: "design-4", name: "4. Elegant Carousel",       tier: "Tier 1" },
  { id: "design-5", name: "5. GlassWave Reviews",      tier: "Tier 2" },
  { id: "design-6", name: "6. Floating Trust Wall",    tier: "Tier 2" },
  { id: "design-7", name: "7. Luxury Spotlight",       tier: "Tier 3" },
  { id: "design-8", name: "8. Cinematic 3D Reviews",   tier: "Tier 3" },
];

// ─────────────────────────────────────────────
// TEMPLATE CATEGORIES (dashboard marketplace)
// ─────────────────────────────────────────────

export const TEMPLATE_CATEGORIES = [
  {
    id: "cat-free",
    plan: PLANS["Free"],
    templates: [DESIGN_TEMPLATES[0], DESIGN_TEMPLATES[1]],
  },
  {
    id: "cat-tier1",
    plan: PLANS["Tier 1"],
    templates: [DESIGN_TEMPLATES[2], DESIGN_TEMPLATES[3]],
  },
  {
    id: "cat-tier2",
    plan: PLANS["Tier 2"],
    templates: [DESIGN_TEMPLATES[4], DESIGN_TEMPLATES[5]],
  },
  {
    id: "cat-tier3",
    plan: PLANS["Tier 3"],
    templates: [DESIGN_TEMPLATES[6], DESIGN_TEMPLATES[7]],
  },
];

// ─────────────────────────────────────────────
// LOCK CHECKER HELPER
// ─────────────────────────────────────────────

/**
 * Returns true if the given template tier is locked for the current user tier.
 * @param {string} templateTier - The tier required to access the template
 * @param {string} activeTier   - The user's current active billing tier
 */
export function isTemplateLocked(templateTier, activeTier) {
  if (templateTier === "Free") return false;
  if (activeTier === "Tier 3") return false;
  if (activeTier === "Tier 2") return templateTier === "Tier 3";
  if (activeTier === "Tier 1") return templateTier === "Tier 2" || templateTier === "Tier 3";
  // activeTier === "Free"
  return templateTier !== "Free";
}
