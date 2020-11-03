import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { appContext } from '../helpers/context'
import http from '../helpers/http'
import { useHistory } from 'react-router-dom'
import { CircularProgress, Snackbar } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1)
    // width: '50px'
  },
  image: {
    width: '20em',
    marginBottom: theme.spacing(8)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
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

export default function LoginScreen () {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const { auth } = useContext(appContext)
  const ac = useRef()
  const password = useRef()
  const remember = useRef()
  const history = useHistory()

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const data = {
      ac: ac.current.value,
      password: password.current.value
    }
    setLoading(true)
    http.post('/auth/login', data)
      .then(response => {
        const { user } = response.data
        if (!user) return
        auth.setAuthUser(user, { persist: remember.current.checked })
        setLoading(false)
        setSuccess(true)
        setTimeout(() => {
          history.push('/')
        }, 300)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src='/aperam.png' className={classes.image}/>
        <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ac"
            label="Registro"
            name="ac"
            autoComplete="ac"
            autoFocus
            inputRef={ac}
            disabled={loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={password}
            disabled={loading}
          />
          <FormControlLabel
            control={<Checkbox color="primary" inputRef={remember} value="0"/>}
            label="Lembrar-me"
            disabled={loading}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={clsx(classes.submit, { [classes.buttonSuccess]: success })}
          >
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Cadastrar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          Em desenvolvimento por: PACM
        </Typography>
      </Box>
      <Snackbar open={error} onClose={() => setError(false)} autoHideDuration={3000} message="Falha na tentativa de Login. Verifique seu registro e senha e tente novamente!">
      </Snackbar>
    </Container>
  )
}
