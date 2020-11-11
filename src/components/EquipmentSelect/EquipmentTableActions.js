import { Button, ButtonGroup, Grid } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { Delete, Edit } from '@material-ui/icons'
import React from 'react'

export default function EquipmentTableActions ({
  onDelete,
  onEdit
}) {
  return (
    <ButtonGroup size="small" >
      <Button color="primary" onClick={onEdit}><Edit/></Button>
      <Button color="secondary" onClick={onDelete}><Delete /></Button>
    </ButtonGroup>
  )
}
