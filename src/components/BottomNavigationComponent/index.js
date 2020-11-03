import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core'
import { Build, Home, Settings } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
}))

export default function BottomNavigationComponent () {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const router = useHistory()

  useEffect(() => {
    const location = router.location
    if (location.pathname === '/') setValue(1)
    if (location.pathname.includes('/equipamentos')) setValue(0)
    if (location.pathname.includes('/solicitacoes')) setValue(2)
  }, [])

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Equipamentos" icon={<Settings />} />
      <BottomNavigationAction label="Inicio" icon={<Home />} />
      <BottomNavigationAction label="Solicitações" icon={<Build />} />
    </BottomNavigation>
  )
}
