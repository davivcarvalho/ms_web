import React, { useContext, useEffect, useState } from 'react'

import LoginScreen from './screens/LoginScreen'
import { Route, Switch } from 'react-router-dom'
import { getLoggedUser } from './helpers/auth'
import { appContext } from './helpers/context'
import HomeScreen from './screens/HomeScreen'

function App () {
  const { auth } = useContext(appContext)

  useEffect(() => {
    const user = getLoggedUser(true)
    if (user) {
      auth.setAuthUser(user)
    }
  }, [])

  return (
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route path="/auth/login" component={LoginScreen} />
    </Switch>
  )
}

export default App
