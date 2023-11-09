import prismadb from "@/lib/prismadb";

// revenue graph data
type GraphData = {
  name: string;
  total: number;
};

// get graph revenue
export const getGraphRevenue = async (storeId: string) => {
  // paid orders
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

  // monthly revenue for graph
  const monthlyRevenue: { [key: number]: number } = {};

  // map over each order of paid orders
  for (const order of paidOrders) {
    // get current order month
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    // for each item in order items, add it to revenue
    for (const item of order.orderItems) {
      revenueForOrder += item.product.price.toNumber();
    }

    // update monthly order
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
  }

  // graph data months
  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // update graph data for each month
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  // return graph data
  return graphData;
};
