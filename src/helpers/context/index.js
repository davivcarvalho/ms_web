import React, { createContext, useState } from 'react'

export const appContext = createContext()

const AppContextProvider = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const [topbarIsVisible, setTopbarIsVisible] = useState(true)
  const [user, setUser] = useState()

  const toogleDrawer = () => {
    setDrawerIsOpen(!drawerIsOpen)
  }
  const closeDrawer = () => {
    setDrawerIsOpen(false)
  }

  const setAuthUser = (user) => {
    setUser(user)
  }
  const setTopbar = (state = true) => {
    setTopbarIsVisible(state)
  }

  return (
    <appContext.Provider value={{
      layout: { drawerIsOpen, toogleDrawer, closeDrawer, topbarIsVisible, setTopbar },
      auth: { user, setAuthUser }
    }}>
      {props.children}
    </appContext.Provider>
  )
}
export default AppContextProvider
