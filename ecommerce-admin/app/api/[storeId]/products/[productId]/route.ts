import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// utilities
import prismadb from "@/lib/prismadb";

// get request
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const { productId } = await params;

    // invalid product id
    if (!productId)
      return new NextResponse("Product id is required", { status: 400 });

    // fetch product data (including images, category, color, and size data)
    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });

    // return response of status 200
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[PRODUCT_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// patch request
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> },
) {
  try {
    const { productId, storeId } = await params;

    // get user id
    const { userId } = auth();
    // get json data from request body
    const body = await req.json();

    // extract product data from json request body
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid name
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // invalid images
    if (!images || !images.length) {
      return new NextResponse("Images are required.", { status: 400 });
    }

    // invalid price
    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    // invalid category id
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    // invalid size id
    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    // invalid color id
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    // invalid product id
    if (!productId)
      return new NextResponse("Product id is required", { status: 400 });

    // invalid store id
    if (!storeId)
      return new NextResponse("Store id is required", { status: 400 });

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

    // update product data
    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    // update product images data
    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    // return response of status 200
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[PRODUCT_PATCH]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete request
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ storeId: string; productId: string }> },
) {
  try {
    const { productId, storeId } = await params;

    // get user id
    const { userId } = auth();

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid product id
    if (!productId)
      return new NextResponse("Product id is required", { status: 400 });

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

    // delete product
    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    // return response of status 200
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[PRODUCT_DELETE]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
