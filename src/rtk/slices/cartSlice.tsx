import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  companyName: string;
  name: string;
  quantity: number;
  description: string;
  originalPrice: number;
  priceAfterDiscount?: number;
  discount?: number;
};

type Cart = {
  totalItems: number;
  totalPrice: number;
  products: Product[];
};

const initialState: Cart = {
  totalItems: 0,
  totalPrice: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.totalItems += action.payload.quantity;
      state.totalPrice +=
        (action.payload.priceAfterDiscount || action.payload.originalPrice) *
        action.payload.quantity;
      state.products.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<Product>) => {
      const product = state.products.find(
        (product) => product.id === action.payload.id
      ) as Product;
      state.totalItems -= product.quantity;
      state.totalPrice -=
        (product.priceAfterDiscount || product.originalPrice) *
        product.quantity;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    increaseAmount: (state, action: PayloadAction<Product>) => {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          product.quantity += 1;
          state.totalItems += 1;
          state.totalPrice +=
            product.priceAfterDiscount || product.originalPrice;
          return product;
        }
        return product;
      });
    },

    decreaseAmount: (state, action: PayloadAction<Product>) => {
      state.products.map((product) => {
        if (product.id === action.payload.id) {
          if (product.quantity > 1) {
            product.quantity -= 1;
            state.totalItems -= 1;
            state.totalPrice -=
              product.priceAfterDiscount || product.originalPrice;
            return product;
          }
        }
        return product;
      });
    },

    resetCart: (state) => {
      state.totalItems = 0;
      state.totalPrice = 0;
      state.products = [];
    },
  },
});

export default cartSlice.reducer;

export const {
  addToCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  resetCart,
} = cartSlice.actions;
