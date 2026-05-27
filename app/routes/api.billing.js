import { redirect } from "react-router";
import shopify from "../shopify.server";
import { PLANS } from "../constants/plans";

export const loader = async () => {
  return redirect("/app");
};

export const action = async ({ request }) => {
  const { billing, session, admin } = await shopify.authenticate.admin(request);
  const formData = await request.formData();
  const plan = formData.get("plan");

  const url = new URL(request.url);
  let host = url.searchParams.get("host");
  
  // Log URL variables for debugging
  console.log("SHOPIFY_APP_URL:", process.env.SHOPIFY_APP_URL);
  console.log("APP_URL:", process.env.APP_URL);
  console.log("request.url:", request.url);
  console.log("host:", host);
  console.log("shop:", session.shop);

  let returnUrl;
  try {
    const baseUrl = process.env.SHOPIFY_APP_URL || process.env.APP_URL || url.origin;
    if (!baseUrl) throw new Error("Base URL is missing");
    
    // The embedded=1 parameter prevents Shopify App Remix from triggering a new OAuth flow
    // when returning from the top-level Shopify billing approval screen.
    returnUrl = new URL(`/billing-return?shop=${session.shop}${host ? `&host=${host}` : ""}&embedded=1`, baseUrl).toString();
  } catch (err) {
    console.error("Error constructing returnUrl:", err);
    returnUrl = `${url.origin}/billing-return?shop=${session.shop}&embedded=1`;
  }
  console.log("final returnUrl:", returnUrl);

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
    return Response.json({ success: true, plan: "Free" });
  }

  // Retrieve plan details
  const planConfig = PLANS[plan];
  if (!planConfig) {
    console.error("Invalid plan selected:", plan);
    return Response.json({ error: "Invalid plan selected" }, { status: 400 });
  }

  const price = parseFloat(planConfig.price.replace("$", ""));

  // Request subscription to the selected plan tier via GraphQL
  try {
    const response = await admin.graphql(
      `#graphql
      mutation appSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean) {
        appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {
          appSubscription {
            id
          }
          confirmationUrl
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          name: planConfig.billingId,
          returnUrl: returnUrl,
          test: true,
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: { amount: price, currencyCode: "USD" },
                  interval: "EVERY_30_DAYS",
                },
              },
            },
          ],
        },
      }
    );

    const responseJson = await response.json();
    console.log("FULL SHOPIFY BILLING GRAPHQL RESPONSE:", JSON.stringify(responseJson, null, 2));

    const appSubscriptionCreate = responseJson.data?.appSubscriptionCreate;
    const confirmationUrl = appSubscriptionCreate?.confirmationUrl;
    const userErrors = appSubscriptionCreate?.userErrors;

    if (userErrors && userErrors.length > 0) {
      console.error("GraphQL UserErrors:", userErrors);
      return Response.json({ 
        success: false, 
        error: userErrors[0]?.message || "Billing creation failed", 
        details: userErrors 
      });
    }

    if (confirmationUrl) {
      console.log("EXTRACTED CONFIRMATION URL:", confirmationUrl);
      return Response.json({ confirmationUrl });
    } else {
      console.error("No confirmationUrl found in response");
      return Response.json({ error: "Missing confirmation URL" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error creating billing request via GraphQL:", error);
    return Response.json({ error: "billing_failed", details: error.message }, { status: 500 });
  }
};
