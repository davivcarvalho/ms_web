import React, { Fragment, useContext, useEffect, useState } from 'react'

import LoginScreen from './screens/LoginScreen'
import { Route, Switch, useHistory } from 'react-router-dom'
import { getLoggedUser } from './helpers/auth'
import { appContext } from './helpers/context'
import HomeScreen from './screens/HomeScreen'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'
import LoadingComponent from './components/LoadingComponent'

function App () {
  const { auth, layout } = useContext(appContext)
  const history = useHistory()

  useEffect(() => {
    const userString = localStorage.getItem('user')
    const user = JSON.parse(userString)
    if (user) {
      auth.setAuthUser(user, {})
      return
    }

    history.push('/auth/login')
  }, [])

  if (!layout.appLoading) {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/auth/login" component={LoginScreen} />
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
