// utilities
import prismadb from "@/lib/prismadb";

// components
import ProductForm from "./components/product-form";

// product page
const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  // fetch product data
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  // fetch categories data
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // fetch sizes data
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  // fetch colors data
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
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
