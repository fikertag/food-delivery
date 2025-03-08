import { createContext, useReducer } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "set_item":
      return {
        cart: action.payload,
      };

    case "create_item":
      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === action.payload.item._id
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        // If item exists, increase its quantity
        updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        updatedCart = [{ ...action.payload.item, quantity: 1 }, ...state.cart];
      }
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { cart: updatedCart };

    case "decrease_quantity":
      let updatedCarts = state.cart
        .map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Ensures no 0-quantity items in cart
      localStorage.setItem("cart", JSON.stringify(updatedCarts));
      return { cart: updatedCarts };

    case "increase_quantity":
      let updatedCarti = state.cart
        .map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCarti));
      return { cart: updatedCarti };

    case "delete_item":
      let updatedCartD = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartD));
      return { cart: updatedCartD };

    default:
      return state;
  }
};

export const CartContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
  });

  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
