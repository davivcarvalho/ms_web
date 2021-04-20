import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

export default function EquipmentDeleteModal ({
  open,
  handleClose,
  equipment = {}
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Deseja deletar {equipment.name}?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        Esta ação e irreversível e deletará todos os equipamentos filhos.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
            Cancelar
        </Button>
        <Button onClick={() => handleClose(equipment.id)} color="secondary">
            Deletar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
