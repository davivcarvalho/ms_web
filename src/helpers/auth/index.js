import { useContext } from 'react'
import { appContext } from '../context'

export const getLoggedUser = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user
}
