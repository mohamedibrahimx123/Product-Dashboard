import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../constants/cartActionTypes";

export default function cartReducer(cart, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;

      const existingProduct = cart.find(function (item) {
        return item.id === product.id;
      });

      if (existingProduct) {
        return cart.map(function (item) {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });
      }

      return [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    case INCREASE_QUANTITY:
      return cart.map(function (item) {
        if (item.id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });

    case DECREASE_QUANTITY:
      return cart
        .map(function (item) {
          if (item.id === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter(function (item) {
          return item.quantity > 0;
        });

    case REMOVE_FROM_CART:
      return cart.filter(function (item) {
        return item.id !== action.payload;
      });

    case CLEAR_CART:
      return [];

    default:
      return cart;
  }
}