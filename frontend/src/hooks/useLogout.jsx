import {useAuthContext} from './useAuthContext'
// import {useItemsContext} from './useItemsContext'

export const useLogout = () => {
  const {dispatch} = useAuthContext()
  // const {dispatch: ItemsContext} = useItemsContext()
  const logout = () => {
    // remove user from storage 
    localStorage.removeItem('user')

    //dispatch

    dispatch({type: 'LOGOUT'})
    // ItemsContext({type: 'SET_item', payload: null})

  }

  return {logout};
}