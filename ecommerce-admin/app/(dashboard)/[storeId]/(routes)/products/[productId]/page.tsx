// utilities
import prismadb from "@/lib/prismadb";

// components
import ProductForm from "./components/product-form";

// product page
const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) => {
  const { productId, storeId } = await params;

  // fetch product data
  const product = await prismadb.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
    },
  });

  // fetch categories data
  const categories = await prismadb.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  // fetch sizes data
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  // fetch colors data
  const colors = await prismadb.color.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <div className="flex-col">
      {/* product create/update form */}
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
