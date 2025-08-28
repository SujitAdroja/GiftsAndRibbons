import { config } from "apps/frontend/config";

export async function getAllProducts() {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/products`, {
      method: "GET",
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getProductById(id: string) {
  try {
    const res = await fetch(`${config.BACKEND_ENDPOINT}/product/${id}`, {
      method: "GET",
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getProductsByCategory(category: string[]) {
  try {
    let query = "";
    if (category.length > 0) query = category.join(",");

    const res = await fetch(
      `${
        config.BACKEND_ENDPOINT
      }/products/category?categories=${encodeURIComponent(query)}`,
      {
        method: "GET",
      }
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function addProductWishlist(productId: string) {
  try {
    const res = await fetch(
      `${config.BACKEND_ENDPOINT}/products/addtowishlist/${productId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function getProductsBySearch(query: string) {
  try {
    const res = await fetch(
      `${config.BACKEND_ENDPOINT}/products/search?q=${encodeURIComponent(
        query
      )}`,
      {
        method: "GET",
      }
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
