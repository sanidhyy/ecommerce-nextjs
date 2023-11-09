import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// utilities
import prismadb from "@/lib/prismadb";

// post request
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // get user id
    const { userId } = auth();
    // get json data from request body
    const body = await req.json();

    // extract size name and value from json request body
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
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // fetch store data
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    // unauthorised user
    if (!storeByUserId) {
      return new NextResponse("Unauthorised", { status: 400 });
    }

    // create size
    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    // return response of status 200
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[SIZES_POST]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// get request
export async function GET(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // invalid store id
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // fetch sizes data
    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    // return response of status 200
    return NextResponse.json(sizes, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[SIZES_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
