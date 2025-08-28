import { config } from "apps/frontend/config";

export async function addToCart(productInfo: any) {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/carts/addToCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInfo),
    });
    let { data } = await res.json();
    data = data[0];
    const totalPrice = data?.cartItems.reduce(
      (sum: any, i: any) => sum + i.price,
      0
    );
    const updatedCart = {
      ...data,
      totalPrice,
    };
    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getCart() {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/carts`, {
      method: "GET",
      credentials: "include",
    });
    let { data } = await res.json();
    data = data[0];
    const totalPrice = data?.cartItems.reduce(
      (sum: any, i: any) => sum + i.price,
      0
    );
    const updatedCart = {
      ...data,
      totalPrice,
    };
    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function removeFromCart(productId: any) {
  try {
    const res = await fetch(
      `${config.BACKEND_ENDPOINT}/carts/remove/${productId}`,
      {
        method: "PATCH",
        credentials: "include",
      }
    );

    let { data } = await res.json();
    data = data[0];
    const totalPrice = data?.cartItems.reduce(
      (sum: any, i: any) => sum + i.price,
      0
    );
    const updatedCart = {
      ...data,
      totalPrice,
    };
    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
export async function incDecCart(productId: string, action: string) {
  try {
    const res = await fetch(
      `${config.BACKEND_ENDPOINT}/carts/update/${productId}/${action}`,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({ action: action }),
      }
    );

    let { data } = await res.json();

    const updatedCart = {
      ...data.newCart[0],
      totalPrice: data.totalPrice,
    };
    return updatedCart;
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export async function checkOutCart(payment_id: string, paymentStatus: string) {
  try {
    const res = await fetch(
      `${config.BACKEND_ENDPOINT}/carts/checkout/${payment_id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentStatus }),
      }
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }
  }
}
