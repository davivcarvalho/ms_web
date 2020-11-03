import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './helpers/context'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './helpers/theme'
import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
