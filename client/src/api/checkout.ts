import axios from "axios";

export async function checkout(cart: any, email?: string) {
  const res = await axios.post("http://localhost:4000/api/checkout", { cart, email });
  return res.data;
}
