import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// utilities
import prismadb from "@/lib/prismadb";

// get request
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ colorId: string }> },
) {
  try {
    const { colorId } = await params;

    // invalid color id
    if (!colorId)
      return new NextResponse("Color id is required", { status: 400 });

    // fetch color data
    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });

    // return response of status 200
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[COLOR_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// patch request
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> },
) {
  try {
    const { colorId, storeId } = await params;

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

    // invalid color id
    if (!colorId)
      return new NextResponse("Color id is required", { status: 400 });

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

    // update color data
    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    // return response of status 200
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[COLOR_PATCH]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete request
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; colorId: string }> },
) {
  try {
    const { colorId, storeId } = await params;

    // get user id
    const { userId } = auth();

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid color id
    if (!colorId)
      return new NextResponse("Color id is required", { status: 400 });

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

    // delete color
    const color = await prismadb.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    // return response of status 200
    return NextResponse.json(color, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[COLOR_DELETE]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
