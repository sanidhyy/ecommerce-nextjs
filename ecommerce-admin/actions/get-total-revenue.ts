import prismadb from "@/lib/prismadb";

// get total revenue
export const getTotalRevenue = async (storeId: string) => {
  // fetch paid orders from prismadb (including order's product data)
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  // total revenue
  const totalRevenue = paidOrders.reduce((total, order) => {
    // count total revenue from each order
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);

    // add order revenue to total revenue
    return total + orderTotal;
  }, 0);

  // return total revenue
  return totalRevenue;
};
