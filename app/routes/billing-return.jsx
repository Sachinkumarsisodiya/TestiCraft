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

  // Immediately redirect safely into /app
  return redirect(`/app?shop=${shop}${host ? `&host=${host}` : ""}&embedded=${embedded}&billing=success`);
};

export default function BillingReturn() {
  return null;
}
