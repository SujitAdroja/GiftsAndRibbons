import { config } from "apps/frontend/config";

export async function getWishlistItems() {
  try {
    const response = await fetch(`${config.BACKEND_ENDPOINT}/wishlist`, {
      method: "GET",
      credentials: "include",
    });
    const { data } = await response.json();
    return data?.products;
  } catch (error) {
    console.log(error);
  }
}

export async function addToWishlist(productId: string) {
  try {
    const response = await fetch(
      `${config.BACKEND_ENDPOINT}/wishlist/addtowishlist/${productId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const { data } = await response.json();
    console.log("Added to wishlist:", data);
    return data?.products;
  } catch (error) {
    console.log(error);
  }
}

export async function removeFromWishlist(productId: string) {
  try {
    const response = await fetch(
      `${config.BACKEND_ENDPOINT}/wishlist/removeFromWishlist/${productId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const { data } = await response.json();
    console.log("Removed from wishlist:", data);
    return data?.products;
  } catch (error) {
    console.log(error);
  }
}
