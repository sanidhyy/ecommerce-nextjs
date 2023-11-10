// types
import { Category } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// get category
const getCategory = async (id: string): Promise<Category> => {
  // fetch category data from api
  const res = await fetch(`${URL}/${id}`);

  // return category data (json)
  return res.json();
};

export default getCategory;
