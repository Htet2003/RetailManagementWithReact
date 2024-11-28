import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

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
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        return { items: [...state.items, { ...action.payload, quantity: 1 }] };
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    reduceQuantity: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => {
        if (item.id === action.payload) {
          if (item.quantity > 1) {
            item.quantity -= 1;
            return true;
          }
          return false;
        }
        return true;
      });
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, reduceQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
