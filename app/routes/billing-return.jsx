import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { Spinner, BlockStack, Text, AppProvider as PolarisAppProvider } from "@shopify/polaris";
import polarisTranslations from "@shopify/polaris/locales/en.json";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");
  const charge_id = url.searchParams.get("charge_id");
  const apiKey = process.env.SHOPIFY_API_KEY || "";

  return { shop, host, charge_id, apiKey };
};

export default function BillingReturn() {
  const { shop, host, charge_id, apiKey } = useLoaderData();

  useEffect(() => {
    if (!shop || !apiKey) return;

    const cleanShop = shop.replace(".myshopify.com", "");
    const adminUrl = `https://admin.shopify.com/store/${cleanShop}/apps/${apiKey}/app/pricing?charge_id=${charge_id || ""}&host=${host || ""}`;
    const embeddedUrl = `/app/pricing?charge_id=${charge_id || ""}&host=${host || ""}`;

    if (window.top === window.self) {
      // Top-level execution detected (standalone).
      // Deep-link back into Shopify Admin to remount the embedded iframe properly.
      window.location.href = adminUrl;
    } else {
      // Already inside an iframe, just navigate to the protected dashboard safely.
      window.location.href = embeddedUrl;
    }
  }, [shop, host, charge_id, apiKey]);

  return (
    <PolarisAppProvider i18n={polarisTranslations}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f4f6f8" }}>
        <BlockStack gap="400" align="center" inlineAlign="center">
          <Spinner size="large" />
          <Text variant="headingMd" as="h2">Returning to TestiCraft...</Text>
          <Text variant="bodySm" tone="subdued">Restoring your session securely</Text>
        </BlockStack>
      </div>
    </PolarisAppProvider>
  );
}
