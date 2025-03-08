import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "set_user":
      return {
        users: action.payload,
      };
    case "create_user":
      return {
        users: [action.payload, ...state.orders],
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });

  const fetchData = async () => {
    try {
      const response = await axios("http://localhost:5000/api/user/users");
      dispatch({ type: "set_user", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
