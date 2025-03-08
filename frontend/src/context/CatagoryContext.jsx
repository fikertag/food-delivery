import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const CatagoryContext = createContext();

export const CatagoryReducer = (state, action) => {
  switch (action.type) {
    case "set_item":
      return {
        catagory: action.payload,
      };
    case "create_item":
      return {
        catagory: [action.payload, ...state.catagory],
      };
    case "delete_item":
      return {
        catagory: state.catagory.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "edit_item":
      return {
        catagory: state.catagory.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item
        ),
      };
    default:
      return state;
  }
};

export const CatagoryContextPovider = ({ children }) => {
  const [state, dispatch] = useReducer(CatagoryReducer, { catagory: "" });

  const fetchCatagory = async () => {
    try {
      const { data } = await axios.get(
        "https://back-mfs7.onrender.com/api/items/catagory"
      );
      dispatch({ type: "set_item", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCatagory();
  }, []);

  return (
    <CatagoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CatagoryContext.Provider>
  );
};
