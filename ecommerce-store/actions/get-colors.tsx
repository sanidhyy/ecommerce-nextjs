// types
import { Color } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

// get colors
const getColors = async (): Promise<Color[]> => {
  // fetch colors data from api
  const res = await fetch(URL);

  // return colors data (json)
  return res.json();
};

export default getColors;
