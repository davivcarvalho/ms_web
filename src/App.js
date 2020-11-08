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

const routes = [
  { path: '/', component: HomeScreen, exact: true },
  { path: '/equipamentos', component: EquipmentSelect, exact: true },
  { path: '/auth/login', component: LoginScreen },
  { path: '/auth/register', component: RegisterScreen }
]

function App () {
  const { auth, layout } = useContext(appContext)
  const location = useLocation()

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
        <AppBarComponent/>
        <AnimatePresence >
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/equipamentos" exact component={EquipmentSelect} />
            <Route path="/auth/login" component={LoginScreen} />
            <Route path="/auth/register" component={RegisterScreen} />
          </Switch>
          <LoadingComponent />
        </AnimatePresence>
        <BottomNavigationComponent />

      </Fragment>
    )
  }
  return (
    <LoadingComponent />
  )
}

export default App
