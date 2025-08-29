import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySearch,
} from "../serviceProvider/productService";
import { getWishlistItems } from "../serviceProvider/wishlist_services";
import { WishlistProducts } from "./recentSclice";
export type Product = {
  _id: string;
  name: string;
  category: string;
  categoryId: string;
  createdAt: Date;
  description: string;
  discountPrice: number;
  features: string[];
  images: string[];
  price: number;
  stock: number;
  tags: string[];
  updatedAt: Date;
  wishlist: boolean;
};

type ProductState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  singleProduct: Product[] | null;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  singleProduct: null,
};
//  Fetch cart from backend
export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const resProducts = await getAllProducts(); // Returns all products
    const resWishlist = await getWishlistItems(); // Returns wishlist array

    const products = resProducts || [];
    const wishlist = resWishlist || [];

    const updatedProducts = products.map((product: Product) => {
      const isWishlisted = wishlist.some((item: WishlistProducts) => {
        return String(item.productId) === String(product._id);
      });

      return {
        ...product,
        wishlist: isWishlisted,
      };
    });

    return updatedProducts;
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (category: string[]) => {
    const resProducts = await getProductsByCategory(category);
    const resWishlist = await getWishlistItems(); // Returns wishlist array

    const products = resProducts || [];
    const wishlist = resWishlist || [];

    const updatedProducts = products.map((product: Product) => {
      const isWishlisted = wishlist.some((item: WishlistProducts) => {
        return String(item.productId) === String(product._id);
      });

      return {
        ...product,
        wishlist: isWishlisted,
      };
    });
    return updatedProducts;
  }
);
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const resProducts = await getProductById(id);
    const resWishlist = await getWishlistItems(); // Returns wishlist array

    const products = resProducts || [];
    const wishlist = resWishlist || [];

    const updatedProducts = products.map((product: Product) => {
      const isWishlisted = wishlist.some((item: WishlistProducts) => {
        return String(item.productId) === String(product._id);
      });

      return {
        ...product,
        wishlist: isWishlisted,
      };
    });
    return [updatedProducts[0]];
  }
);

export const getProductsBySearching = createAsyncThunk(
  "products/getProductsBySearching",
  async (query: string) => {
    const resProducts = await getProductsBySearch(query);
    const resWishlist = await getWishlistItems(); // Returns wishlist array

    const products = resProducts || [];
    const wishlist = resWishlist || [];

    const updatedProducts = products.map((product: Product) => {
      const isWishlisted = wishlist.some((item: WishlistProducts) => {
        return String(item.productId) === String(product._id);
      });

      return {
        ...product,
        wishlist: isWishlisted,
      };
    });

    return updatedProducts;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getProductsBySearching.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsBySearching.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsBySearching.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default productSlice.reducer;
