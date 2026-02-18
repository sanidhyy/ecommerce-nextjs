import Stripe from "stripe";
import { NextResponse } from "next/server";

// utilities
import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// header options
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// post request
export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  const { storeId } = await params;

  // get product id
  const { productIds } = await req.json();

  // product id(s) are required
  if (!productIds || productIds.length == 0)
    return new NextResponse("Product id(s) are required", { status: 400 });

  // fetch products data
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  // line items
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // update line items
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });

  // create order
  const order = await prismadb.order.create({
    data: {
      storeId: storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  // create stripe session
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  // return response of status 200
  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
      status: 200,
    },
  );
}
