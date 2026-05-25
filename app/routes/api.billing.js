import { redirect } from "react-router";
import shopify from "../shopify.server";

export const loader = async () => {
  return redirect("/app");
};

export const action = async ({ request }) => {
  const { billing, session } = await shopify.authenticate.admin(request);
  const formData = await request.formData();
  const plan = formData.get("plan");

  const cleanShop = session.shop.replace(".myshopify.com", "");
  const returnUrl = `https://admin.shopify.com/store/${cleanShop}/apps/testicraft/app`;

  // If user requests to downgrade to Free, cancel their current active billing subscription
  if (plan === "Free") {
    const billingCheck = await billing.check({
      plans: ["Tier 1", "Tier 2", "Tier 3"],
      isTest: true,
    });

    if (billingCheck.hasActivePayment && billingCheck.appSubscriptions.length > 0) {
      const activeSub = billingCheck.appSubscriptions[0];
      await billing.cancel({
        subscriptionId: activeSub.id,
        isTest: true,
      });
    }
    return redirect("/app");
  }

  // Request subscription to the selected plan tier
  try {
    await billing.request({
      plan: plan,
      isTest: true,
      returnUrl: returnUrl,
    });
  } catch (error) {
    if (error instanceof Response) {
      throw error; // Shopify billing.request throws a Response for redirection
    }
    console.error("Error creating billing request:", error);
    return redirect("/app?error=billing_failed");
  }
};
