import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// utilities
import prismadb from "@/lib/prismadb";

// get request
export async function GET(
  _req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // invalid category id
    if (!params.categoryId)
      return new NextResponse("Category id is required", { status: 400 });

    // fetch billboards data (including billboard data)
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    // return response of status 200
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[CATEGORY_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// patch request
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // get user id
    const { userId } = auth();
    // get json data from request body
    const body = await req.json();

    // extract name and billboard id from json request body
    const { name, billboardId } = body;

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid name
    if (!name) return new NextResponse("Name is required", { status: 400 });

    // invalid billboard id
    if (!billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    // invalid category id
    if (!params.categoryId)
      return new NextResponse("Category id is required", { status: 400 });

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

    // update category data
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    // return response of status 200
    return NextResponse.json(category, { status: 20 });
  } catch (error) {
    // show error message
    console.log("[CATEGORY_PATCH]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete request
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // get user id
    const { userId } = auth();

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid category id
    if (!params.categoryId)
      return new NextResponse("Category id is required", { status: 400 });

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

    // delete category
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    // return response of status 200
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[CATEGORY_DELETE]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
