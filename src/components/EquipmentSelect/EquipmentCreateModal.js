import { Grid, makeStyles, Modal, Paper } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: 0
  },
  paper: {
    width: '80%',
    minHeight: '20em',
    padding: theme.spacing(1)
  }
}))

export default function EquipmentCreateModal ({
  open,
  handleClose
}) {
  const classes = useStyles()

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Paper elevation={5} className={classes.paper}>
        <input type='text' />
      </Paper>
    </Modal>
  )
}
