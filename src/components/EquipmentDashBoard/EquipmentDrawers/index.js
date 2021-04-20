import { Grid, makeStyles, Snackbar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import http from '../../../helpers/http'
import { TransitionWrapper } from '../../../helpers/theme/transitions'
import EquipmentCreateModal from './EquipmentCreateModal'
import EquipmentDeleteModal from './EquipmentDeleteModal'
import LoadingComponent from '../../LoadingComponent'
import EquipmentsTable from './EquipmentsTable'

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

export default function EquipmentDrawers () {
  const classes = useStyles()
  const [equipments, setEquipments] = useState()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [edit, setEdit] = useState()
  const [deleteModal, setDeleteModal] = useState(false)
  const [equipmentDelete, setEquipmentDelete] = useState()
  const [openCreateModal, setOpenCreateModal] = useState(false)

  const onCreateClick = () => {
    setOpenCreateModal(true)
  }
  const loadEquipments = () => {
    http.get('/equipments')
      .then(response => {
        const { equipments } = response.data
        if (!equipments) return
        setData(equipments)
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
  }
  useEffect(() => {
    loadEquipments()
  }, [])

  const onModalClose = (success) => {
    setOpenCreateModal(false)
    setEdit()
    if (success) loadEquipments()
  }

  const handleEquipmentEdit = (id, child) => {
    const result = data.find(e => e.id === id)
    if (!result) return
    const equipmentForEdition = { ...result }
    if (child === true) equipmentForEdition.forParent = true
    setEdit(equipmentForEdition)
    setOpenCreateModal(true)
  }
  const handleEquipmentDelete = (id) => {
    const equipmentForDelete = data.find(e => e.id === id)
    if (!equipmentForDelete) return
    setEquipmentDelete(equipmentForDelete)
    setDeleteModal(true)
  }

  const onDeleteClose = (id) => {
    if (!id) {
      setDeleteModal(false)
      setEquipmentDelete()
      return
    }
    setLoading(true)
    http.delete(`/equipment/${id}`)
      .then(response => {
        setLoading(false)
        setDeleteModal(false)
        setEquipmentDelete()
        loadEquipments()
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
        setDeleteModal(false)
        setEquipmentDelete()
      })
  }
  return (
    <TransitionWrapper>
      <Grid container justify="center" className={classes.pageContainer}>
        <Grid item md={11} lg={10} xl={10} sm={11} >
          <EquipmentsTable equipments={equipments} handleCreateButton={onCreateClick} onEdit={handleEquipmentEdit} onDelete={handleEquipmentDelete}/>
        </Grid>
      </Grid>
      <EquipmentCreateModal open={openCreateModal} handleClose={onModalClose} edit={edit}/>
      <EquipmentDeleteModal open={deleteModal} handleClose={onDeleteClose} equipment={equipmentDelete} />
      <LoadingComponent open={loading}/>
      <Snackbar open={error} onClose={() => setError(null)} autoHideDuration={3000} message={error && error.message} />

    </TransitionWrapper>
  )
}
