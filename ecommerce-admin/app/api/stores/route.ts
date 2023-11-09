import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

// utilities
import prismadb from "@/lib/prismadb";

// post request
export async function POST(req: Request) {
  try {
    // get user id
    const { userId } = auth();
    // request body
    const body = await req.json();

    // extract store name from body
    const { name } = body;

    // unauthenticated user
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // name is required
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    // create store data
    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    // return response of status 200
    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    // show error message
    console.log("[STORES_POST]", error);
    // return response of status 500
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
