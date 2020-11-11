import { Button, CircularProgress, Grid, makeStyles, Modal, Paper, TextField, Typography } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import http from '../../helpers/http'

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
    padding: theme.spacing(2)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    '& > *': {
      margin: theme.spacing(1)
      // width: '25ch'
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}))

export default function EquipmentCreateModal ({
  open,
  handleClose
}) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const name = useRef()
  const label = useRef()
  const description = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: name.current.value,
      label: label.current.value,
      description: description.current.value
    }
    setLoading(true)
    http.post('/equipment', data)
      .then(response => {
        setLoading(false)
        setSuccess(true)
        handleClose(true)
      })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modal}
    >
      <Paper elevation={5} className={classes.paper}>
        <Typography variant="h6"> CRIAR NOVO EQUIPAMENTO </Typography>
        <Typography variant="subtitle1"> Insira os dados abaixo para criar um novo equipamento. </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Nome"
            name="name"
            autoComplete="name"
            inputRef={name}
            autoFocus
            disabled={loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="label"
            label="TAG"
            name="label"
            autoComplete="label"
            inputRef={label}
            disabled={loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="Descrição"
            name="description"
            autoComplete="name"
            inputRef={description}
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading || success}
            className={clsx(classes.submit, { [classes.buttonSuccess]: success })}
          >
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

        Enviar
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}
