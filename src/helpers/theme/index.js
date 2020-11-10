import React from 'react'
import { createMuiTheme } from '@material-ui/core'
import AppBarComponent from '../../components/AppBarComponent'
import BottomNavigationComponent from '../../components/BottomNavigationComponent'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4a0551'
    }
  }
})

export const AppLayout = ({ children }) => (
  <>
    <AppBarComponent/>
    { children }
    <BottomNavigationComponent />
  </>
)
