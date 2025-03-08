import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const ItemsContext = createContext();

export const itemsReducer = (state, action) => {
  switch (action.type) {
    case "set_item":
      return {
        items: action.payload,
      };
    case "create_item":
      return {
        items: [action.payload, ...state.items],
      };
    case "delete_item":
      return {
        items: state.workouts.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ItemsContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(itemsReducer, { items: null });
  const fetchData = async () => {
    try {
      const { data } = await axios("http://localhost:5000/api/items");
      dispatch({ type: "set_item", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ItemsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
