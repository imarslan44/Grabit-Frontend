import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const res = await fetch(`/api/cart/${userId}`);
  const data = await res.json();
  return data.items;
});

export const addToCartBackend = createAsyncThunk(
  "cart/addToCartBackend",
  async ({ userId, item }) => {
    const res = await fetch(`/api/cart/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    return data.items;
  }
);

export const removeFromCartBackend = createAsyncThunk(
  "cart/removeFromCartBackend",
  async ({ userId, productId }) => {
    const res = await fetch(`/api/cart/${userId}/${productId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data.items;
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(addToCartBackend.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCartBackend.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});

export default cartSlice.reducer;

