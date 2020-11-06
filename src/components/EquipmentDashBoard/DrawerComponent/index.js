import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { AccountTree, LiveHelp, Settings, Wallpaper } from '@material-ui/icons'
import { Drawer } from '@material-ui/core'
import { appContext } from '../../../helpers/context'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 320,
    paddingTop: 65,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

export default function DrawerComponent () {
  const classes = useStyles()
  const { layout } = useContext(appContext)

  const handleClick = (screen) => {
    layout.changeAppBarTitle(screen)

    layout.toogleDrawer(true)
  }

  return (
    <Drawer anchor="left" open={layout.drawerIsOpen} onClose={() => layout.toogleDrawer(true)} >
      <List
        component="nav"
        className={classes.root}
      >
        <ListItem button onClick={() => handleClick('equipments')}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Equipamentos" />
        </ListItem>
        <ListItem button onClick={() => handleClick('drawers')}>
          <ListItemIcon>
            <Wallpaper />
          </ListItemIcon>
          <ListItemText primary="Desenhos" />
        </ListItem>
        <ListItem button onClick={() => handleClick('subEquipments')}>
          <ListItemIcon>
            <AccountTree />
          </ListItemIcon>
          <ListItemText primary="SubEquipamentos" />
        </ListItem>
        <ListItem button onClick={() => handleClick('helps')}>
          <ListItemIcon>
            <LiveHelp />
          </ListItemIcon>
          <ListItemText primary="Ajudas" />
        </ListItem>
      </List>

    </Drawer>
  )
}
