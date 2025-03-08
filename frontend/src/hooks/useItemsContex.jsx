import {ItemsContext} from "../context/itemContext"
import { useContext } from "react"

export const useItemsContext = () => {
  const context = useContext(ItemsContext)

  if (!context) {
    throw Error('use context provide must be used in scope')
  }

  return context
}