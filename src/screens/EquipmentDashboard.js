import { Button, Drawer, ListItem, ListItemText } from '@material-ui/core'
import React, { useContext } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import { appContext } from '../helpers/context'
import DrawerComponent from '../components/EquipmentDashBoard/DrawerComponent'
import { useParams } from 'react-router-dom'

export default function EquipmentDashboard () {
  const { layout } = useContext(appContext)
  const { label } = useParams()
  return (
    <>
      <AppBarComponent withDrawer title={layout.appBarTitle}/>
      <DrawerComponent/>
      <h1 style={{ marginTop: 60, padding: 20 }} >
        {label}
      </h1>
      <BottomNavigationComponent />
    </>
  )
}
