import { OrderContext } from "../context/OrderContext";
import { useContext } from "react";

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) {
    throw Error("use context provide must be used in scope");
  }

  return context;
};
