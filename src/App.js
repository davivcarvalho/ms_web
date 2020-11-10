import React, { Fragment, useContext, useEffect, useState } from 'react'

import LoginScreen from './screens/LoginScreen'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { appContext } from './helpers/context'
import HomeScreen from './screens/HomeScreen'
import LoadingComponent from './components/LoadingComponent'
import RegisterScreen from './screens/RegisterScreen'
import EquipmentSelect from './screens/EquipmentSelect'
import { AnimatePresence } from 'framer-motion'
import BottomNavigationComponent from './components/BottomNavigationComponent'
import AppBarComponent from './components/AppBarComponent'
import { AppLayout } from './helpers/theme'

function App () {
  const { auth, layout } = useContext(appContext)

  // useEffect(() => {
  //   const userString = localStorage.getItem('user')
  //   const user = JSON.parse(userString)
  //   if (user) {
  //     auth.setAuthUser(user, {})
  //     return
  //   }

  //   history.push('/auth/login')
  // }, [])

  if (!layout.appLoading) {
    return (
      <Fragment>
        <Route render={({ location }) => (
          <AnimatePresence exitBeforeEnter >
            <Switch location={location} key={location.pathname}>
              <Route path="/" exact><AppLayout><HomeScreen /></AppLayout></Route>
              <Route path="/equipamentos" exact><AppLayout><EquipmentSelect /></AppLayout></Route>
              <Route path="/auth/login" component={LoginScreen} />
              <Route path="/auth/register" component={RegisterScreen} />
            </Switch>
          </AnimatePresence>
        )} />
        <LoadingComponent />
      </Fragment>
    )
  }
  return (
    <LoadingComponent />
  )
}

export default App
