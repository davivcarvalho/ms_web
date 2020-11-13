import { Button, ButtonGroup, Grid } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { Add, Create, Delete, Edit, PlusOne } from '@material-ui/icons'
import React from 'react'

export default function EquipmentTableActions ({
  onDelete,
  onEdit,
  subEquipment = false
}) {
  return (
    <ButtonGroup size="small" >
      { !subEquipment && <Button color="primary" onClick={() => onEdit(true)}><Add/></Button> }
      <Button color="primary" onClick={onEdit}><Edit/></Button>
      <Button color="secondary" onClick={onDelete}><Delete /></Button>
    </ButtonGroup>
  )
}
