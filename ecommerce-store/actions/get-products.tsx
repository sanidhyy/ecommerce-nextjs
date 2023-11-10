import qs from "query-string";

// types
import { Product } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

// product filter query interface
type Query = {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
};

// get products
const getProducts = async (query: Query): Promise<Product[]> => {
  // create filtered products url
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });

  // fetch filtered products data from api
  const res = await fetch(url);

  // return filtered products data (json)
  return res.json();
};

export default getProducts;
