import { format } from "date-fns";

// utilities
import prismadb from "@/lib/prismadb";

// components
import { BillboardClient } from "./components/billboard-client";
import { BillBoardColumn } from "./components/columns";

// billboards page
const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  // fetch billboards data (order by createdAt desc)
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // formatted billboards (changed createdAt date structure)
  const formattedBillboards: BillBoardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      {/* billboard client */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
