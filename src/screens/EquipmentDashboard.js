import { Button, Drawer, ListItem, ListItemText } from '@material-ui/core'
import React, { useContext } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import { appContext } from '../helpers/context'
import DrawerComponent from '../components/EquipmentDashBoard/DrawerComponent'
import { useHistory, useParams } from 'react-router-dom'
import EquipmentDrawers from '../components/EquipmentDashBoard/EquipmentDrawers'

export default function EquipmentDashboard () {
  const { layout } = useContext(appContext)
  const { label } = useParams()
  const router = useHistory()
  const page = router.location.pathname.split('/')[3]

  const renderPage = () => {
    console.log(page)
    if (page === 'desenhos') return <EquipmentDrawers />
  }

  return (
    <>
      <AppBarComponent withDrawer title={layout.appBarTitle}/>
      <DrawerComponent/>
      <h1 style={{ marginTop: 60, padding: 20 }} >
        { renderPage() }
      </h1>
      <BottomNavigationComponent />
    </>
  )
}
