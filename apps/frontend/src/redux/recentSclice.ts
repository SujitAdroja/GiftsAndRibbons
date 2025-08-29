import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWishlistItems } from "../serviceProvider/wishlist_services";
import { Product } from "./productSlice";

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};
export type WishlistProducts = {
  _id: string;
  productId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  images: string[];
};

// ✅ Fetch user details from backend on refresh
export const fetchRecentProducts = createAsyncThunk(
  "recent/fetchProducts",
  async () => {
    try {
      const data = localStorage.getItem("recentlyVisited");
      if (!data) {
        return [];
      }
      if (data) {
        const wishlist = await getWishlistItems();
        if (!wishlist) return JSON.parse(data);
        const products = JSON.parse(data);
        const result = products.map((product: Product) => {
          const wishlisted = wishlist.some(
            (item: WishlistProducts) => String(item._id) === String(product._id)
          );
          return { ...product, wishlist: wishlisted };
        });
        console.log("result from rescently visited", result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProductToRecentlyVisited = createAsyncThunk(
  "recent/addProductToRecentlyVisited",
  async ({ _id, name, description, images, price }: Product) => {
    try {
      let items = [];
      const stored = localStorage.getItem("recentlyVisited");
      if (stored) {
        try {
          items = JSON.parse(stored);
          if (!Array.isArray(items)) {
            items = [];
          }
        } catch {
          items = [];
        }
      }
      // Add new data at start, limit to 5
      if (items?.length === 5) items.pop();
      items = items.filter((item) => item._id !== _id);
      items.unshift({
        _id,
        name,
        description,
        images,
        price,
        categoryId: "",
        createdAt: new Date(),
        discountPrice: 0,
        features: [],
        stoke: 0,
        tags: [],
        updatedAt: new Date(),
      });
      localStorage.setItem("recentlyVisited", JSON.stringify(items));
    } catch (error) {
      console.log(error);
    }
  }
);

// ✅ Slice
const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecentProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchRecentProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default recentSlice.reducer;
