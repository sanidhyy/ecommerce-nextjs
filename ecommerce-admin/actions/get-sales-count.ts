import prismadb from "@/lib/prismadb";

// get sales count
export const getSalesCount = async (storeId: string) => {
  // fetch paid orders count from api prisma db
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  // return sales count
  return salesCount;
};
