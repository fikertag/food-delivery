import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios"

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const {dispatch} = useAuthContext()

  const login = async (email,password) => {
    setError(null)
    setIsLoading(null)

    const fetchData = async () => {
      try {
        const {data} = await axios.post("http://localhost:5000/api/user/login", {email: email, password: password})
        localStorage.setItem('user', JSON.stringify(data))
         dispatch({type: 'LOGIN', payload: data})
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        setError(error.response.data.error)
      }
    }
    fetchData()
  }
  return {login, isLoading, error}
}