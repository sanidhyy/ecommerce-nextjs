// actions
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";

// components
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

// home page
const HomePage = async () => {
  // get product(s) info from api
  const products = await getProducts({ isFeatured: true });
  // get billboard info from api
  const billboard = await getBillboard("6d7eeeff-5712-4341-bce8-2ca8cd6125d5");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {/* billboard */}
        <Billboard data={billboard} />

        {/* product list */}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
