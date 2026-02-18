// actions
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";

// components
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import Filter from "./components/filter";
import MobileFilters from "./components/mobile-filters";

// category page props
type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    colorId: string;
    sizeId: string;
  }>;
};

// category page
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = await params;
  const { colorId, sizeId } = await searchParams;

  // fetch product info from api
  const products = await getProducts({
    categoryId: categoryId,
    colorId: colorId,
    sizeId: sizeId,
  });

  // fetch sizes from api
  const sizes = await getSizes();
  // fetch colors from api
  const colors = await getColors();
  // fetch category from api
  const category = await getCategory(categoryId);

  return (
    <div className="bg-white">
      <Container>
        {/* billboard */}
        <Billboard data={category.billboard} />

        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* mobile filters */}
            <MobileFilters sizes={sizes} colors={colors} />
            {/* filters (desktop) */}
            <div className="hidden lg:block">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {/* no results found */}
              {products.length === 0 && <NoResults />}
              {/* product(s) list */}
              <div
                id="products"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
