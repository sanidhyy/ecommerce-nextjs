// types
import { Product } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

// get product
const getProduct = async (id: string): Promise<Product> => {
  // fetch product data from api
  const res = await fetch(`${URL}/${id}`);

  // return product data (json)
  return res.json();
};

export default getProduct;
