// utilities
import prismadb from "@/lib/prismadb";

// components
import CategoryForm from "./components/category-form";

// category page
const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string; storeId: string }>;
}) => {
  const { categoryId, storeId } = await params;

  // fetch category data
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  // fetch billboards data
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      {/* category create/update form */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
