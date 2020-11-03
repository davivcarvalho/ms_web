import { useContext } from 'react'
import { appContext } from '../context'

export const getLoggedUser = (boot = false) => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user
}
