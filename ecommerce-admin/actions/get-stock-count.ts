import prismadb from "@/lib/prismadb";

// get stock count
export const getStockCount = async (storeId: string) => {
  // fetch product data from prismadb which aren't archived
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  // return stock count
  return stockCount;
};
