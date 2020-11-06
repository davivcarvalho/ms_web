import { Button, Drawer, ListItem, ListItemText } from '@material-ui/core'
import React, { useContext } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import { appContext } from '../helpers/context'
import DrawerComponent from '../components/EquipmentDashBoard/DrawerComponent'

export default function EquipmentDashboard () {
  const { layout } = useContext(appContext)
  return (
    <>
      <AppBarComponent withDrawer/>
      <DrawerComponent/>

      <BottomNavigationComponent />
    </>
  )
}
