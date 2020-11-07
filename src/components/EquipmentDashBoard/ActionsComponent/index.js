import { Button, ButtonGroup, Grid } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import React from 'react'

export default function ActionsComponent () {
  return (
    <ButtonGroup size="small" >
      <Button color="primary">Editar</Button>
      <Button color="secondary">Excluir</Button>
    </ButtonGroup>
  )
}
