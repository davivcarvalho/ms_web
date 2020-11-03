import React, { useContext, useEffect, useState } from 'react'

import LoginScreen from './screens/LoginScreen'
import { Route, Switch, useHistory } from 'react-router-dom'
import { getLoggedUser } from './helpers/auth'
import { appContext } from './helpers/context'
import HomeScreen from './screens/HomeScreen'
import { CircularProgress, makeStyles } from '@material-ui/core'
import LoadingComponent from './components/LoadingComponent'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    padding: 100
  },
  div: {
    width: '100%',
    height: '100%'
  }
}))

function App () {
  const classes = useStyles()

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

  if (!layout.initialLoading) {
    return (
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/auth/login" component={LoginScreen} />
      </Switch>
    )
  }
  return (
    <LoadingComponent />
  )
}

export default App
