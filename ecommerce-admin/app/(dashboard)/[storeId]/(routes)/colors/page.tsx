import { format } from "date-fns";

// utilities
import prismadb from "@/lib/prismadb";

// components
import { ColorClient } from "./components/color-client";
import { ColorColumn } from "./components/columns";

// colors page
const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  // fetch colors data (order by createdAt desc)
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // formatted colors (changed createdAt date structure)
  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      {/* color client */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
