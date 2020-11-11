import { Button, Grid, makeStyles, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import Paper from '@material-ui/core/Paper'
import LoadingComponent from '../components/LoadingComponent'

import http from '../helpers/http'
import { TransitionWrapper } from '../helpers/theme/transitions'
import EquipmentsTable from '../components/EquipmentSelect/EquipmentsTable'
import { Edit } from '@material-ui/icons'
import EquipmentCreateModal from '../components/EquipmentSelect/EquipmentCreateModal'

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
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const onCreateClick = () => {
    setOpenCreateModal(true)
  }

  useEffect(() => {
    http.get('/equipments')
      .then(response => {
        const { equipments } = response.data
        if (!equipments) return

        const extractedEquipments = equipments.flatMap(equipment => {
          const childrens = []
          const newEquipment = { ...equipment }

          equipments.forEach(item => {
            if (item.parent && item.parent.id === newEquipment.id) childrens.push(item)
          })

          if (childrens.length > 0) newEquipment.childrens = childrens
          if (newEquipment.parent) return []
          return [newEquipment]
        })
        setLoading(false)

        setEquipments(extractedEquipments)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return (
    <TransitionWrapper>
      <Grid container justify="center" className={classes.pageContainer}>
        <Grid item md={11} lg={10} >
          <EquipmentsTable equipments={equipments} handleCreateButton={onCreateClick} />
        </Grid>
      </Grid>
      <EquipmentCreateModal open={openCreateModal} handleClose={() => setOpenCreateModal(false)}/>
      <LoadingComponent open={loading}/>
      <Snackbar open={error} onClose={() => setError(null)} autoHideDuration={3000} message={error && error.message} />

    </TransitionWrapper>
  )
}
