import {
  createContext,
  useEffect,
  useReducer,
} from "react";

import cartReducer from "../reducers/cartReducer";

import {
  getStoredCart,
  saveCart,
} from "../utils/cartStorage";

import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../constants/cartActionTypes";

export const CartContext = createContext(null);


export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    getStoredCart
  );

  useEffect(
      () => {
        saveCart(cart);
    },
    [cart]
  );

  const cartCount = cart.reduce(function (
    total,
    item
  ) {
    return total + item.quantity;
  }, 0);

  const totalPrice = cart.reduce(function (
    total,
    item
  ) {
    return total + item.price * item.quantity;
  }, 0);

  function addToCart(product) {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  }

  function increaseQuantity(productId) {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: productId,
    });
  }

  function decreaseQuantity(productId) {
    dispatch({
      type: DECREASE_QUANTITY,
      payload: productId,
    });
  }

  function removeFromCart(productId) {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  }

  function clearCart() {
    dispatch({
      type: CLEAR_CART,
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}