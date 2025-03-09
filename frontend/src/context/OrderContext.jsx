import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import { useAuthContext } from "../hooks/useAuthContext";

export const OrderContext = createContext();

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "set_order":
      return {
        orders: action.payload,
      };
    case "create_order":
      return {
        orders: [action.payload, ...state.orders],
      };
    default:
      return state;
  }
};

export const OrderContextProvider = ({ children }) => {
  const { dispatch: edit_item } = useCartContext();

  const [state, dispatch] = useReducer(orderReducer, { orders: [] });
  const navigate = useNavigate();
  const createOrder = async (orderData) => {
    const loadingToast = toast.loading("Loading...");

    try {
      const response = await axios.post(
        "https://back-mfs7.onrender.com/api/order",
        orderData
      );

      dispatch({ type: "create_order", payload: response.data });
      toast.success("uploaded successfully!", { id: loadingToast });
      edit_item({
        type: "set_item",
        payload: [],
      });
      localStorage.setItem("cart", JSON.stringify([]));
      navigate("/about/orders");
    } catch (error) {
      toast.error("Something went wrong!", { id: loadingToast });
    }
  };
  const { user } = useAuthContext();

  const fetchOrders = async () => {
    if (user.admin) {
      try {
        const response = await axios.get(
          `https://back-mfs7.onrender.com/api/order`
        );
        console.log(response.data);
        dispatch({ type: "set_order", payload: response.data });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    } else {
      try {
        const response = await axios.get(
          `https://back-mfs7.onrender.com/api/order/${user._id}`
        );
        dispatch({ type: "set_order", payload: response.data });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <OrderContext.Provider value={{ ...state, dispatch, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
