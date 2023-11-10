// types
import { Billboard } from "@/types";

// base url
const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

// get billboard
const getBillboard = async (id: string): Promise<Billboard> => {
  // fetch billboard data from api
  const res = await fetch(`${URL}/${id}`);

  // return billboard data (json)
  return res.json();
};

export default getBillboard;
