import { format } from "date-fns";

// utilities
import prismadb from "@/lib/prismadb";

// components
import { CategoryClient } from "./components/category-client";
import { CategoryColumn } from "./components/columns";

// categories page
const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  // fetch categories data (including billboard data, order by createdAt desc)
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // formatted categories (changed createdAt date structure)
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {/* category client */}
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
