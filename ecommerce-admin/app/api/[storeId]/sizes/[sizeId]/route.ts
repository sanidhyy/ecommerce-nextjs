import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// utilities
import prismadb from "@/lib/prismadb";

// get request
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ sizeId: string }> },
) {
  try {
    const { sizeId } = await params;

    // invalid size id
    if (!sizeId)
      return new NextResponse("Size id is required", { status: 400 });

    // fetch size data
    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    // return response of status 200
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[SIZE_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// patch request
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; sizeId: string }> },
) {
  try {
    const { sizeId, storeId } = await params;

    // get user id
    const { userId } = auth();
    // get json data from request body
    const body = await req.json();

    // extract name and value from json request body
    const { name, value } = body;

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid name
    if (!name) return new NextResponse("Name is required", { status: 400 });

    // invalid value
    if (!value) return new NextResponse("Value is required", { status: 400 });

    // invalid size id
    if (!sizeId)
      return new NextResponse("Size id is required", { status: 400 });

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

    // update size data
    const size = await prismadb.size.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });

    // return response of status 200
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[SIZE_PATCH]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete request
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; sizeId: string }> },
) {
  try {
    const { sizeId, storeId } = await params;

    // get user id
    const { userId } = auth();

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid size id
    if (!sizeId)
      return new NextResponse("Size id is required", { status: 400 });

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

    // delete size
    const size = await prismadb.size.deleteMany({
      where: {
        id: sizeId,
      },
    });

    // return response of status 200
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[SIZE_DELETE]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
