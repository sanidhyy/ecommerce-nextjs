import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// utilities
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// post request
export async function POST(req: Request) {
  // request body
  const body = await req.text();
  // request signature for verifying stripe payments
  const signature = headers().get("Stripe-Signature") as string;

  // stripe event (to check if transaction is completed)
  let event: Stripe.Event;

  try {
    // connect to stripe webhook
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    // unable to connect to stripe webhook
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // stripe checkout session
  const session = event.data.object as Stripe.Checkout.Session;

  // stripe address
  const address = session?.customer_details?.address as Stripe.Address;

  // address components
  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  // join all address components
  const addressString = addressComponents.filter((c) => c !== null).join(", ");

  // check if checkout is completed
  if (event.type === "checkout.session.completed") {
    // update pay status
    await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
    });
  }

  // return response of status 200
  return new NextResponse(null, { status: 200 });
}
