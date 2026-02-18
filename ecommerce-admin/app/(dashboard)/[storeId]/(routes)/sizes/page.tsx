import { format } from "date-fns";

// utilities
import prismadb from "@/lib/prismadb";

// components
import { SizeClient } from "./components/size-client";
import { SizeColumn } from "./components/columns";

// sizes page
const SizesPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;

  // fetch sizes data (order by createdAt desc)
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // formatted sizes (changed createdAt date structure)
  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* size client */}
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
