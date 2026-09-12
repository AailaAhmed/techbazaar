import { createContext, useContext, useState, useEffect } from "react";
import { getCartCount } from "../utils/cart";

const cartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(getCartCount());

  function refreshCartCount() {
    setCartCount(getCartCount());
  }

  return (
    <cartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  return useContext(cartContext);
}