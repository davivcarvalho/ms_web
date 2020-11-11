import { Button, ButtonGroup, Grid } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import { Delete, Edit } from '@material-ui/icons'
import React from 'react'

export default function EquipmentTableActions () {
  return (
    <ButtonGroup size="small" >
      <Button color="primary"><Edit/></Button>
      <Button color="secondary"><Delete /></Button>
    </ButtonGroup>
  )
}
