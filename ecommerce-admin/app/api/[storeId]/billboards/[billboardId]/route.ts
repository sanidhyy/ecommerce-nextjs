import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// utilities
import prismadb from "@/lib/prismadb";

// get request
export async function GET(
  _req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    // invalid billboard id
    if (!params.billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    // fetch billboards data
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    // return response of status 200
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[BILLBOARD_GET]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// patch request
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    // get user id
    const { userId } = auth();
    // get json data from request body
    const body = await req.json();

    // extract billboard label and image from json request body
    const { label, imageUrl } = body;

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid label
    if (!label) return new NextResponse("Label is required", { status: 400 });

    // invalid image url
    if (!imageUrl)
      return new NextResponse("Image url is required", { status: 400 });

    // invalid billboard id
    if (!params.billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

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

    // update billboard data
    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    // return response of status 200
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[BILLBOARD_PATCH]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// delete request
export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    // get user id
    const { userId } = auth();

    // unauthenticated user
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    // invalid billboard id
    if (!params.billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

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

    // delete billboard
    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    // return response of status 200
    return NextResponse.json(billboard, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[BILLBOARD_DELETE]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
