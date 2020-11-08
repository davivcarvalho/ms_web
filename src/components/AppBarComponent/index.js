import { AppBar, IconButton, makeStyles, MenuItem, Toolbar, Typography, Menu, Button, Avatar } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Close, Menu as MenuIcon } from '@material-ui/icons'
import React, { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { appContext } from '../../helpers/context'
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 1350
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  type: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    minWidth: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    marginBottom: 10,
    width: 65,
    height: 65
  },
  logoutButton: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: red[400]
  },
  roleText: {
    marginTop: 5
  }
}))

export default function AppBarComponent ({
  title = '',
  withDrawer = false
}) {
  const router = useHistory()
  const classes = useStyles()
  const { auth, layout } = useContext(appContext)
  const anchorEl = useRef()
  const [showUserDropdow, setShowUserDropdow] = useState(false)

  const handleLogoutButton = () => {
    setShowUserDropdow(false)
    auth.logoutUser()
  }

  const roleText = (role) => {
    if (role === 'maintenance') return 'Mantenedor'
    if (role === 'operator') return 'Operador'

    return ''
  }

  const toogleDrawer = () => {
    layout.toogleDrawer()
  }

  if (!layout.topbarIsVisible) return null

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {withDrawer && (
          <IconButton edge="start" onClick={toogleDrawer} className={classes.menuButton} color="inherit" aria-label="menu">
            { layout.drawerIsOpen
              ? <Close />
              : <MenuIcon />
            }
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {auth.user
          ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={() => setShowUserDropdow(true)}
                color="inherit"
                ref={anchorEl}
              >
                <Avatar src={auth.user.avatar} />
              </IconButton>
              <Menu
                id="customized-menu"
                variant="menu"
                anchorEl={anchorEl.current}
                onClose={() => setShowUserDropdow(false)}
                keepMounted
                open={showUserDropdow}
              >
                <div className={classes.type}>
                  <Avatar className={classes.avatar} src={auth.user.avatar} />
                  <Typography variant="h6"> {auth.user.name} </Typography>
                  <Typography variant="subtitle2"> {auth.user.ac} </Typography>
                  <Typography className={classes.roleText} variant="body2"> {roleText(auth.user.role)} </Typography>
                </div>
                <MenuItem className={classes.logoutButton} onClick={handleLogoutButton}>Sair</MenuItem>
              </Menu>
            </div>
          )
          : (
            <Button color="inherit" onClick={() => router.push('/auth/login')}>Entrar</Button>
          )}
      </Toolbar>
    </AppBar>
  )
}
