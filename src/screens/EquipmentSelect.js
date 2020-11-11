import { Button, Grid, makeStyles, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import Paper from '@material-ui/core/Paper'
import LoadingComponent from '../components/LoadingComponent'

import http from '../helpers/http'
import { TransitionWrapper } from '../helpers/theme/transitions'
import EquipmentsTable from '../components/EquipmentSelect/EquipmentsTable'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pageContainer: {
    marginTop: 90,
    // marginLeft: 20,
    marginRight: 20
  },
  tableFooter: {
    padding: 20
  }
})

export default function EquipmentSelect () {
  const classes = useStyles()
  const [equipments, setEquipments] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    http.get('/equipments')
      .then(response => {
        const { equipments } = response.data
        setLoading(false)
        if (!equipments) return

        const extractedEquipments = equipments.map(equipment => {
          const childrens = []

          equipments.forEach(item => {
            if (item.parent && item.parent.id === equipment.id) childrens.push(item)
          })

          if (childrens.length > 0) equipment.childrens = childrens
          return equipment
        })
        console.log(extractedEquipments)

        setEquipments(equipments)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return (
    <TransitionWrapper>
      <Grid container alignItems="center" className={classes.pageContainer}>
        <Grid item md={12} xs={12}>
          <EquipmentsTable equipments={equipments}/>
        </Grid>
      </Grid>
      <LoadingComponent open={loading}/>
      <Snackbar open={error} onClose={() => setError(null)} autoHideDuration={3000} message={error && error.message} />

    </TransitionWrapper>
  )
}
