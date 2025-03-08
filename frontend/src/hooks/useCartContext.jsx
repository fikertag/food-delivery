import {CartContext} from "../context/cartContext"
import { useContext } from "react"

export const useCartContext = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw Error('use context provide must be used in scope')
  }

  return context
}