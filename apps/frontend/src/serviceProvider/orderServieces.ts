import { config } from "apps/frontend/config";

export async function getAllOrders() {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/orders`, {
      method: "GET",
      credentials: "include",
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function findOrder(orderId: string) {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/orders/${orderId}`, {
      method: "GET",
      credentials: "include",
    });

    const { data } = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
