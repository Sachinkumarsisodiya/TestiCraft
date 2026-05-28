import { redirect } from "react-router";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const shop = url.searchParams.get("shop");
  const host = url.searchParams.get("host");
  const embedded = url.searchParams.get("embedded") || "1";

  // Log variables to ensure host is preserved
  console.log("BILLING RETURN ROUTE:");
  console.log("Shop:", shop);
  console.log("Host:", host);
  console.log("Embedded:", embedded);

  if (!shop) {
    return redirect("/app");
  }

  // To prevent the "Shopify Login Page" (OAuth loop) issue, we MUST redirect the user
  // back to the actual Shopify Admin URL, not our app's URL.
  // This forces the Shopify Admin to natively load and mount our app inside the iframe safely,
  // providing all the necessary App Bridge tokens without triggering a new OAuth flow.
  const cleanShop = shop.replace(".myshopify.com", "");
  const apiKey = process.env.SHOPIFY_API_KEY || "";
  
  const adminUrl = `https://admin.shopify.com/store/${cleanShop}/apps/${apiKey}/app?billing=success&host=${host || ""}`;

  return redirect(adminUrl);
};

export default function BillingReturn() {
  return null;
}
