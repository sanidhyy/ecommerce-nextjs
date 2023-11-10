// types
import { Product } from "@/types";

// components
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";

// product list props
type ProductListProps = {
  title: string;
  items: Product[];
};

// product list
const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      {/* title */}
      <h3 className="font-bold text-3xl">{title}</h3>
      {/* no products found */}
      {items.length === 0 && <NoResults />}

      {/* product(s) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
