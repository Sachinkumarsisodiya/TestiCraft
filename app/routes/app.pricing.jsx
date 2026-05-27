import { useState, useEffect } from "react";
import { useLoaderData, Form, useRouteError, useFetcher } from "react-router";
import { Page, Text, BlockStack, InlineStack, Button, Grid, Modal, Banner, Spinner } from "@shopify/polaris";
import shopify from "../shopify.server";
import { TestiCraftLogo } from "../components/TestiCraftLogo";
import { PLANS, PLAN_ORDER, getUpgradeTarget } from "../constants/plans";

export const loader = async ({ request }) => {
  const { billing, session } = await shopify.authenticate.admin(request);
  const url = new URL(request.url);
  const charge_id = url.searchParams.get("charge_id");
  const host = url.searchParams.get("host");
  const embedded = url.searchParams.get("embedded");
  const shop = session?.shop || url.searchParams.get("shop");
  const apiKey = process.env.SHOPIFY_API_KEY || "";

  let activeTier = "Free";
  try {
    if (billing) {
      const billingCheck = await billing.check({
        plans: ["Tier 1", "Tier 2", "Tier 3"],
        isTest: true,
      });
      if (billingCheck.hasActivePayment && billingCheck.appSubscriptions.length > 0) {
        activeTier = billingCheck.appSubscriptions[0].name;
      }
    }
  } catch (error) {
    console.error("Billing check error on pricing:", error);
    activeTier = "Free";
  }

  return { activeTier, charge_id, host, embedded, shop, apiKey };
};

// Pricing page plan definitions (display order)
const PRICING_PLANS = [
  {
    key: "Free",
    features: ["2 Standard Templates", "Unlimited Testimonials", "Basic Customization"],
    isFree: true,
    isDark: false,
  },
  {
    key: "Tier 1",
    features: ["4 Premium Layouts", "Carousel Support", "Gradient Flow Design"],
    isFree: false,
    isDark: false,
  },
  {
    key: "Tier 2",
    features: ["6 Premium Layouts", "GlassWave Filters", "Floating Trust Wall"],
    isFree: false,
    isDark: false,
  },
  {
    key: "Tier 3",
    features: ["All 8 Cinematic Layouts", "Luxury 3D Transforms", "Editorial Spotlight"],
    isFree: false,
    isDark: true,
  },
];

export default function Pricing() {
  const { activeTier, charge_id, host, embedded, shop, apiKey } = useLoaderData() || {};
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(!!charge_id);

  const openCheckout = (planKey) => setCheckoutPlan(planKey);
  const closeCheckout = () => setCheckoutPlan(null);

  const billingFetcher = useFetcher();

  useEffect(() => {
    // Detect post-billing return in top-level standalone mode
    if (charge_id && embedded === "1" && window.top === window.self) {
      console.log("Detecting standalone post-billing return. Forcing admin remount...");
      const cleanShop = shop?.replace(".myshopify.com", "");
      if (cleanShop && apiKey) {
        window.location.href = `https://admin.shopify.com/store/${cleanShop}/apps/${apiKey}/app/pricing?charge_id=${charge_id}&host=${host || ""}`;
      }
    }
  }, [charge_id, embedded, shop, apiKey, host]);

  useEffect(() => {
    if (billingFetcher.data) {
      console.log("FRONTEND billingFetcher.data:", billingFetcher.data);
    }
    
    if (billingFetcher.data?.confirmationUrl) {
      // Use App Bridge v4 equivalent of Redirect.Action.REMOTE
      console.log("FRONTEND confirmationUrl before redirect:", billingFetcher.data.confirmationUrl);
      window.open(billingFetcher.data.confirmationUrl, "_top");
    } else if (billingFetcher.data?.success && billingFetcher.data?.plan === "Free") {
      closeCheckout();
    }
  }, [billingFetcher.data]);

  const safeTier = activeTier || "Free";
  const upgrade = getUpgradeTarget(safeTier);
  const activePlanMeta = PLANS[safeTier] || PLANS["Free"];

  // Theme preview mock
  const renderThemePreview = (planMeta, isFree) => (
    <div style={{
      height: "150px",
      background: isFree ? "#f8fafc" : `linear-gradient(135deg, ${planMeta.color}08 0%, ${planMeta.color}18 100%)`,
      borderTopLeftRadius: "18px",
      borderTopRightRadius: "18px",
      position: "relative",
      overflow: "hidden",
      borderBottom: `1px solid ${planMeta.color}22`,
      display: "flex", justifyContent: "center", alignItems: "center",
    }}>
      <div style={{ width: "85%", height: "70%", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ height: "13px", background: isFree ? "#cbd5e1" : `${planMeta.color}60`, borderRadius: "6px", width: "40%", margin: "0 auto" }} />
        <div style={{ flex: 1, display: "flex", gap: "10px" }}>
          {[100, 80].map((w, i) => (
            <div key={i} style={{ flex: 1, background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", padding: "10px" }}>
              <div style={{ height: "7px", background: "#e2e8f0", width: "100%", marginBottom: "5px", borderRadius: "4px" }} />
              <div style={{ height: "7px", background: "#e2e8f0", width: `${w}%`, borderRadius: "4px" }} />
            </div>
          ))}
        </div>
      </div>
      {!isFree && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
          display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10,
        }}>
          <div style={{
            background: `linear-gradient(135deg, ${planMeta.color}, ${planMeta.color}cc)`,
            color: "#fff", padding: "7px 18px", borderRadius: "24px",
            fontWeight: "700", fontSize: "0.82rem",
            boxShadow: `0 6px 20px ${planMeta.color}50`,
          }}>
            Premium Unlock
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Page title="Pricing & Plans" fullWidth>
      <BlockStack gap="600">

        {/* ── BRANDED PAGE HEADER ── */}
        <div className="tc-dash-header" style={{ marginBottom: "24px" }}>
          <TestiCraftLogo height={42} />
          <div className="tc-dash-header-divider" style={{ width: "1px", height: "40px", background: "#e2e8f0", flexShrink: 0 }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "1.5rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1.2 }}>TestiCraft</div>
            <div style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: "500", marginTop: "2px" }}>Pricing & Plans</div>
          </div>
        </div>

        {showSuccessBanner && (
          <Banner
            title="Subscription Activated Successfully!"
            tone="success"
            onDismiss={() => setShowSuccessBanner(false)}
          >
            <p>Your premium plan features are now fully unlocked.</p>
          </Banner>
        )}

        <div style={{ textAlign: "center", margin: "32px 0 8px 0" }}>
          <Text variant="heading3xl" as="h1" fontWeight="bold">Choose Your Plan</Text>
          <div style={{ marginTop: "12px" }}>
            <Text variant="bodyLg" as="p" tone="subdued">
              Scale your social proof with high-converting cinematic testimonial designs.
            </Text>
          </div>
          {/* Active plan pill */}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: activePlanMeta.bgColor,
              color: activePlanMeta.color,
              border: `1px solid ${activePlanMeta.borderColor}`,
              padding: "5px 14px", borderRadius: "24px",
              fontSize: "0.78rem", fontWeight: "700", letterSpacing: "0.04em",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: activePlanMeta.color, boxShadow: `0 0 6px ${activePlanMeta.color}` }} />
              Current plan: {activePlanMeta.displayName}
            </div>
          </div>
        </div>

        {/* PLAN CARDS */}
        <Grid>
          {PRICING_PLANS.map((planConfig) => {
            const meta = PLANS[planConfig.key];
            const isActive = activeTier === planConfig.key;
            const isMostPopular = meta.isMostPopular;

            return (
              <Grid.Cell key={planConfig.key} columnSpan={{ xs: 6, sm: 6, md: 3, lg: 3 }}>
                <div style={{ position: "relative", height: "100%", paddingTop: isMostPopular ? "20px" : "0" }}>
                  {/* Most Popular badge */}
                  {isMostPopular && (
                    <div style={{
                      position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)",
                      zIndex: 20, whiteSpace: "nowrap",
                      background: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
                      color: "#fff", padding: "5px 18px", borderRadius: "20px",
                      fontSize: "0.72rem", fontWeight: "800", letterSpacing: "0.1em",
                      textTransform: "uppercase", boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
                    }}>
                      Most Popular
                    </div>
                  )}

                  {/* Card */}
                  <div style={{
                    borderRadius: "20px",
                    border: isMostPopular
                      ? `2px solid ${meta.color}`
                      : (isActive ? `2px solid ${meta.color}` : (planConfig.isDark ? "1px solid #1e293b" : "1px solid #e5e7eb")),
                    background: isMostPopular
                      ? "linear-gradient(160deg, #faf5ff 0%, #f5f3ff 100%)"
                      : (isActive ? meta.bgColor : (planConfig.isDark ? "#0f172a" : "#ffffff")),
                    color: planConfig.isDark && !isActive ? "#ffffff" : "inherit",
                    height: "100%", display: "flex", flexDirection: "column",
                    boxShadow: isMostPopular
                      ? `0 12px 40px ${meta.shadowColor}, 0 4px 12px ${meta.shadowColor}`
                      : (isActive ? `0 10px 30px -10px ${meta.shadowColor}` : (planConfig.isDark ? "0 20px 40px -15px rgba(0,0,0,0.5)" : "none")),
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {renderThemePreview(meta, planConfig.isFree)}

                    <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <BlockStack gap="300">

                        {/* Tier badge + Active indicator */}
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                          <span style={{
                            background: meta.bgColor, color: meta.color,
                            padding: "4px 10px", borderRadius: "8px",
                            fontSize: "0.72rem", fontWeight: "800",
                            letterSpacing: "0.06em", textTransform: "uppercase",
                          }}>
                            {meta.badge}
                          </span>
                          {isActive && (
                            <span style={{
                              background: "rgba(16,185,129,0.1)", color: "#10b981",
                              border: "1px solid rgba(16,185,129,0.3)",
                              padding: "3px 10px", borderRadius: "20px",
                              fontSize: "0.7rem", fontWeight: "700",
                            }}>
                              Active
                            </span>
                          )}
                        </div>

                        {/* Plan display name */}
                        <Text variant="headingMd" as="h3">
                          <span style={{ color: planConfig.isDark && !isActive ? "#ffffff" : "#0f172a" }}>
                            {meta.shortName}
                          </span>
                        </Text>

                        {/* Price */}
                        <div>
                          <span style={{ fontSize: "2.2rem", fontWeight: "800", color: planConfig.isDark && !isActive ? "#fff" : "#0f172a", letterSpacing: "-0.03em" }}>
                            {meta.price}
                          </span>
                          <span style={{ fontSize: "0.9rem", color: planConfig.isDark && !isActive ? "#94a3b8" : "#6b7280", marginLeft: "4px" }}>
                            {meta.period}
                          </span>
                        </div>

                        <Text variant="bodyMd" as="p">
                          <span style={{ color: planConfig.isDark && !isActive ? "#94a3b8" : "#6b7280" }}>
                            {meta.tagline}
                          </span>
                        </Text>

                        {/* Feature list */}
                        <div style={{ marginTop: "8px" }}>
                          <BlockStack gap="150">
                            {planConfig.features.map((f) => (
                              <InlineStack key={f} gap="200" blockAlign="center">
                                <span style={{ color: "#10b981", fontWeight: "700", flexShrink: 0 }}>&#10003;</span>
                                <span style={{ color: planConfig.isDark && !isActive ? "#cbd5e1" : "#374151", fontSize: "0.95rem" }}>{f}</span>
                              </InlineStack>
                            ))}
                          </BlockStack>
                        </div>
                      </BlockStack>

                      {/* CTA Button */}
                      <div style={{ marginTop: "auto", paddingTop: "28px" }}>
                        {isActive ? (
                          <Button fullWidth disabled>&#10003; Current Plan</Button>
                        ) : planConfig.isFree ? (
                          activeTier !== "Free" ? (
                            <Form method="POST" action={`/api/billing?host=${host || ""}`}>
                              <input type="hidden" name="plan" value="Free" />
                              <Button fullWidth tone="critical" submit>
                                Downgrade to FREE &#8211; Starter Spark
                              </Button>
                            </Form>
                          ) : (
                            <Button fullWidth disabled>&#10003; Current Plan</Button>
                          )
                        ) : (
                          <button
                            onClick={() => openCheckout(planConfig.key)}
                            style={{
                              width: "100%", padding: "13px 20px",
                              background: isMostPopular
                                ? "linear-gradient(135deg, #7c3aed, #8b5cf6)"
                                : `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
                              color: "#fff", border: "none", borderRadius: "12px",
                              fontSize: "0.95rem", fontWeight: "700", cursor: "pointer",
                              boxShadow: isMostPopular
                                ? "0 6px 20px rgba(124,58,237,0.4)"
                                : `0 4px 14px ${meta.color}40`,
                              transition: "transform 0.15s ease, box-shadow 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = isMostPopular ? "0 10px 28px rgba(124,58,237,0.5)" : `0 8px 20px ${meta.color}50`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = isMostPopular ? "0 6px 20px rgba(124,58,237,0.4)" : `0 4px 14px ${meta.color}40`;
                            }}
                            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
                            onMouseUp={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                          >
                            {upgrade && upgrade.plan === planConfig.key
                              ? upgrade.label
                              : `Select ${meta.shortName}`}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Grid.Cell>
            );
          })}
        </Grid>

        {/* Footer reassurance */}
        <div style={{ textAlign: "center", paddingBottom: "16px" }}>
          <Text variant="bodySm" tone="subdued">
            All plans include a free trial period. Cancel anytime from your Shopify admin. Managed securely by Shopify Billing.
          </Text>
        </div>

      </BlockStack>

      {/* SHOPIFY BILLING CHECKOUT MODAL */}
      <Modal
        open={!!checkoutPlan}
        onClose={() => { if (billingFetcher.state === "idle") closeCheckout(); }}
        title={`Upgrade to ${checkoutPlan ? PLANS[checkoutPlan].displayName : ""}`}
      >
        <Modal.Section>
          <BlockStack gap="400">
            {billingFetcher.data?.error && (
              <Banner title="Billing Error" tone="critical">
                {billingFetcher.data.error}
              </Banner>
            )}
            {checkoutPlan && (() => {
              const meta = PLANS[checkoutPlan];
              return (
                <>
                  <div style={{ 
                    textAlign: "center", margin: "24px 0", display: "flex", flexDirection: "column", alignItems: "center",
                    transition: "opacity 0.3s ease",
                    opacity: billingFetcher.state !== "idle" ? 0.5 : 1,
                    pointerEvents: billingFetcher.state !== "idle" ? "none" : "auto"
                  }}>
                    <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "48px", height: "48px", borderRadius: "50%", background: meta.bgColor || "#fef3c7", color: meta.color || "#f59e0b", marginBottom: "16px" }}>
                      <span style={{ fontSize: "1.5rem" }}>⭐</span>
                    </div>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px", lineHeight: 1.3 }}>
                      {meta.displayName}
                    </h2>
                    <div style={{ fontSize: "2.8rem", fontWeight: "800", color: "#0f172a", marginBottom: "16px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                      {meta.price}<span style={{ fontSize: "1.2rem", color: "#64748b", fontWeight: "600", letterSpacing: "normal" }}>/mo</span>
                    </div>
                    <p style={{ fontSize: "1.15rem", color: "#475569", maxWidth: "380px", margin: "0 auto", lineHeight: 1.6 }}>
                      {meta.tagline}
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: "flex", justifyContent: "center", gap: "12px", marginTop: "32px", marginBottom: "12px",
                    pointerEvents: billingFetcher.state !== "idle" ? "none" : "auto"
                  }}>
                    <Button onClick={closeCheckout} disabled={billingFetcher.state !== "idle"}>View All Plans</Button>
                    <Button onClick={closeCheckout} disabled={billingFetcher.state !== "idle"}>Cancel</Button>
                    <button 
                      type="button" 
                      onClick={() => {
                        billingFetcher.submit(
                          { plan: meta.billingId || checkoutPlan },
                          { method: "post", action: `/api/billing?host=${host || ""}` }
                        );
                      }}
                      disabled={billingFetcher.state !== "idle"} style={{
                        background: billingFetcher.state !== "idle" ? "#475569" : "#111827",
                        color: "#ffffff",
                        border: "none",
                        padding: "9px 20px",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: billingFetcher.state !== "idle" ? "wait" : "pointer",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        transition: "background 0.2s"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = billingFetcher.state !== "idle" ? "#475569" : "#000000"}
                      onMouseLeave={(e) => e.currentTarget.style.background = billingFetcher.state !== "idle" ? "#475569" : "#111827"}
                    >
                      {billingFetcher.state !== "idle" ? (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <Spinner size="small" /> Redirecting to Shopify...
                        </div>
                      ) : (
                        `Upgrade Now — ${meta.price}/mo`
                      )}
                    </button>
                  </div>
                </>
              );
            })()}
          </BlockStack>
        </Modal.Section>
      </Modal>

    </Page>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <Page>
      <div style={{ padding: "20px", background: "#fee2e2", border: "1px solid #ef4444", borderRadius: "8px", color: "#7f1d1d" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>⚠️ Pricing Render Crash</h2>
        <p style={{ marginBottom: "10px" }}>The component encountered a runtime error. This does not affect your data.</p>
        <pre style={{ background: "#f87171", color: "#fff", padding: "10px", borderRadius: "4px", overflowX: "auto" }}>
          {error?.message || "Unknown Error"}
          {"\n"}{error?.stack}
        </pre>
      </div>
    </Page>
  );
}
