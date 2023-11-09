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
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

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

    // create product
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        sizeId,
        colorId,
        categoryId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
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
    console.log("[PRODUCTS_POST]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// get request
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // get search params
    const { searchParams } = new URL(req.url);
    // get category id
    const categoryId = searchParams.get("categoryId") || undefined;
    // get size id
    const sizeId = searchParams.get("sizeId") || undefined;
    // get color id
    const colorId = searchParams.get("colorId") || undefined;
    // get is Featured
    const isFeatured = searchParams.get("isFeatured");

    // invalid store id
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    // fetch products data (including images, category, color, and size data, order by createdAt desc)
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // return response of status 200
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[PRODUCTS_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
