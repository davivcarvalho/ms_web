import { useContext } from 'react'
import { appContext } from '../context'

export const setLoggedUser = (user) => {
  const { auth } = useContext(appContext)
  if (!user) return
  auth.setAuthUser(user)
  localStorage.setItem('user', JSON.stringify(user))
}

export const getLoggedUser = (boot = false) => {
  let user
  if (!boot) {
    const { auth } = useContext(appContext)
    user = auth.user
    if (user) return user
  }
  user = JSON.parse(localStorage.getItem('user'))
  return user
}
