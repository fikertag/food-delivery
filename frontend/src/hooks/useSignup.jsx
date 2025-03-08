import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setError(null);
    setIsLoading(true); // `null` isn't correct, should be `true`

    try {
      const { data } = await axios.post(
        "https://back-mfs7.onrender.com/api/user/signup",
        { email, password }
      );

      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: data });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || "Signup failed");
      throw error; // Properly propagate error
    }
  };

  return { signup, isLoading, error };
};
