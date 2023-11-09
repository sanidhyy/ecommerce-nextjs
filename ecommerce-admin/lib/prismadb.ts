import { PrismaClient } from "@prisma/client";

// declare prisma client globally
declare global {
  var prisma: PrismaClient | undefined;
}

// initialise prisma client
const prismadb = globalThis.prisma || new PrismaClient();
// update prisma client only in dev mode
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
