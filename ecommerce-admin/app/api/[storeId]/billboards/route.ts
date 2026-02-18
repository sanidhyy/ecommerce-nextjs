import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// utilities
import prismadb from "@/lib/prismadb";

// post request
export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const { storeId } = await params;

    // get user id
    const { userId } = auth();
    // get json data from request body
    const body = await req.json();

    // extract billboard label and image from json request body
    const { label, imageUrl } = body;

    // unauthenticated user
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // invalid label
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    // invalid image url
    if (!imageUrl) {
      return new NextResponse("Image url is required", { status: 400 });
    }

    // invalid store id
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // fetch store data
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    // unauthorised user
    if (!storeByUserId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    // create billboard
    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: storeId,
      },
    });

    // return response of status 200
    return NextResponse.json(billboard);
  } catch (error) {
    // show error message
    console.log("[BILLBOARDS_POST]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// get request
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const { storeId } = await params;
    // invalid store id
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // fetch billboards data
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: storeId,
      },
    });

    // return response of status 200
    return NextResponse.json(billboards, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[BILLBOARDS_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
