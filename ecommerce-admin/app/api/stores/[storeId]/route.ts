import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// utilities
import prismadb from "@/lib/prismadb";

// patch request
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // get user id
    const { userId } = auth();
    // extract json body from request
    const body = await req.json();

    // get store name from json request body
    const { name } = body;

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // name is required
    if (!name) return new NextResponse("Name is required", { status: 400 });

    // store id is required
    if (!params.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    // update store data
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    // return response of status 200
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[STORE_PATCH]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId)
      return new NextResponse("Store id is required", { status: 400 });

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
