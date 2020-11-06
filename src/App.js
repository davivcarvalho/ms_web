import React, { Fragment, useContext, useEffect, useState } from 'react'

import LoginScreen from './screens/LoginScreen'
import { Route, Switch, useHistory } from 'react-router-dom'
import { appContext } from './helpers/context'
import HomeScreen from './screens/HomeScreen'
import LoadingComponent from './components/LoadingComponent'
import RegisterScreen from './screens/RegisterScreen'
import EquipmentDashboard from './screens/EquipmentDashboard'

function App () {
  const { auth, layout } = useContext(appContext)
  const history = useHistory()

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
        <Switch>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/equipamentos" exact component={EquipmentDashboard} />
          <Route path="/auth/login" component={LoginScreen} />
          <Route path="/auth/register" component={RegisterScreen} />
        </Switch>
        <LoadingComponent />
      </Fragment>
    )
  }
  return (
    <LoadingComponent />
  )
}

export default App
