import {CatagoryContext} from "../context/CatagoryContext"
import { useContext } from "react"

export const useCatagoryContext = () => {
  const context = useContext(CatagoryContext)

  if (!context) {
    throw Error('use context provide must be used in scope')
  }

  return context
}