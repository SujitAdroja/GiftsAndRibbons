import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  checkOutCart,
  getCart,
  incDecCart,
  removeFromCart,
} from "../serviceProvider/cartService";

export type CartItem = {
  _id: string;
  productId: string;
  price: number;
  quantity: number;
};

export type Cart = {
  _id: string;
  userId: string;
  cartItems: CartItem[];
  totalPrice: number;
};

type CartState = {
  cart: Cart;
  loading: boolean;
  error: string | null;
  sidebarOpen: boolean;
};

const initialState: CartState = {
  cart: { _id: "", userId: "", cartItems: [], totalPrice: 0 },
  loading: false,
  sidebarOpen: false,
  error: null,
};

//  Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await getCart();
  return res; // Expecting [{ productId, name, price, quantity }]
});

//  Add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addToCart",
  async (productInfo: {
    productId: string;
    quantity: number;
    price: number;
  }) => {
    try {
      const res = await addToCart(productInfo);
      return res;
    } catch (error) {
      return error;
    }
  }
);

//  Update item quantity
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (item: { productId: string; action: string }) => {
    const res = await incDecCart(item.productId, item.action);
    return res;
  }
);

//  Remove item
export const removeItemFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string) => {
    try {
      const res = await removeFromCart(productId);
      return res;
    } catch (error) {
      return error;
    }
  }
);

//order cart items
export const checkoutCartItems = createAsyncThunk(
  "cart/checkout",
  async ({
    payment_id,
    paymentStatus,
  }: {
    payment_id: string;
    paymentStatus: string;
  }) => {
    try {
      const res = await checkOutCart(payment_id, paymentStatus);
      return res;
    } catch (error) {
      return error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      // Add
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.sidebarOpen = true;
      })

      // Update
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      // Remove
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })

      //checkout
      .addCase(checkoutCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});
export const { toggleSidebar } = cartSlice.actions;

export default cartSlice.reducer;
