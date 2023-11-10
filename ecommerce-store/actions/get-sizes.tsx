// types
import { Size } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

// get sizes
const getSizes = async (): Promise<Size[]> => {
  // fetch sizes data from api
  const res = await fetch(URL);

  // return sizes data (json)
  return res.json();
};

export default getSizes;
