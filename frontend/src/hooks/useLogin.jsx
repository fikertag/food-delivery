import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(null);

    setError(null);
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://back-mfs7.onrender.com/api/user/login",
        { email, password }
      );
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || "login failed");
      throw error;
    }
  };

  return { login, isLoading, error };
};
