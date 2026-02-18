import Stripe from "stripe";

// instantiate new stripe client
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2026-01-28.clover",
  typescript: true,
});
