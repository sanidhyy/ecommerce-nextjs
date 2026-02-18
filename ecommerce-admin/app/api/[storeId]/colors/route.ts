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

    // extract color name and value from json request body
    const { name, value } = body;

    // unauthenticated user
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // invalid name
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // invalid value
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    // create color
    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: storeId,
      },
    });

    // return response of status 200
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[COLORS_POST]", error);
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

    // fetch colors data
    const colors = await prismadb.color.findMany({
      where: {
        storeId: storeId,
      },
    });

    // return response of status 200
    return NextResponse.json(colors, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[COLORS_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
