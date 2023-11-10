// types
import { Category } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

// get categories
const getCategories = async (): Promise<Category[]> => {
  // fetch categories data from api
  const res = await fetch(URL);

  // return categories data (json)
  return res.json();
};

export default getCategories;
