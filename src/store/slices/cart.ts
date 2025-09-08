// store/cartSlice.ts
import { reactToastify } from "@/utils/toastify";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addAll: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        reactToastify({
          type: "warning",
          message: "این محصول اضافه شده است",
        });
        item.quantity += 1;
      } else {
        reactToastify({
          type: "success",
          message: "محصول اضافه شد",
        });
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      reactToastify({
        type: "success",
        message: "محصول با موفقیت حذف گردید",
      });
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addAll,
} = cartSlice.actions;
export default cartSlice.reducer;
