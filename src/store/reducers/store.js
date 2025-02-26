import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productReducer";
import { errorReducer } from "./errorReducer";
import { cartReducer } from "./cartReducer";
import { authReducer } from "./authReducer";

const cartItems = localStorage.getItem("cartItems") && localStorage.getItem("cartItems") !== "undefined"
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const user = localStorage.getItem("auth") && localStorage.getItem("auth") !== "undefined"
  ? JSON.parse(localStorage.getItem("auth"))
  : [];

const initialState = {
  auth: { user: user },
  carts: { cart: cartItems },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
  },
  preloadedState: initialState
});

export default store;