import React, { Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import SettingIcon from '@material-ui/icons/Settings'
import { Build } from '@material-ui/icons'
import HomeIcon from '@material-ui/icons/Home'

import { useHistory } from 'react-router-dom'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'

export default function HomeScreen () {
  return (
    <Fragment>
      <AppBarComponent/>
      <BottomNavigationComponent/>
    </Fragment>
  )
}
