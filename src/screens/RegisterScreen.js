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
import { CircularProgress, MenuItem, Snackbar } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import clsx from 'clsx'
import { TransitionWrapper } from '../helpers/theme/transitions'

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
    width: '17em',
    marginBottom: theme.spacing(9.5),
    marginTop: theme.spacing(7)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2)
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

export default function RegisterScreen () {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formError, setFormError] = useState()
  const [roleSelectValue, setRoleSelectValue] = useState('')
  const { auth, layout } = useContext(appContext)
  const name = useRef()
  const ac = useRef()
  const password = useRef()
  const passwordConfirm = useRef()
  const history = useHistory()

  useEffect(() => {
    layout.setTopbar(false)
    layout.setBottomBar(false)
    return () => {
      layout.setTopbar(true)
      layout.setBottomBar(true)
    }
  }, [])

  const handleSubmitForm = (e) => {
    e.preventDefault()
    const { data, hasError } = extractFormData()
    setLoading(true)
    http.post('/user', data)
      .then(response => {
        const { user } = response.data
        if (!user) throw new Error('')

        auth.setAuthUser(user)

        setSuccess(true)
        setLoading(false)

        setTimeout(() => {
          history.replace('/')
        }, 2500)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  const extractFormData = () => {
    const data = {
      name: name.current.value,
      role: roleSelectValue,
      ac: ac.current.value,
      password: password.current.value
    }
    const passwordConfirmation = passwordConfirm.current
    const error = { }

    if (!data.name || data.name.length < 1) error.name = true
    if (!data.role || data.role.length < 1) error.role = true
    if (!data.ac || data.ac.length < 1) error.ac = true
    if (!data.password || data.password.length < 1) error.password = true
    if (!passwordConfirmation || data.password !== passwordConfirmation) error.passwordConfirm = true

    return { data, error, hasError: Object.keys(error).length === 0 }
  }

  return (
    <TransitionWrapper>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img src='/aperam.png' className={classes.image}/>
          <Typography variant="body2" color="textPrimary" align="center">
          Insira os dados abaixo para criar um novo registro:
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              inputRef={name}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ac"
              label="Registro"
              name="ac"
              autoComplete="ac"
              helperText="Por favor insira seu registro ACxxxxx."

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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confime sua Senha"
              type="password"
              id="passwordConfirm"
              autoComplete="false"
              inputRef={passwordConfirm}
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              select
              name="role"
              label="Função"
              helperText="Por favor selecione sua função no sistema."
              id="role"
              autoComplete="false"
              disabled={loading}
              value={roleSelectValue}
              onChange={(event) => setRoleSelectValue(event.target.value)}
            >
              <MenuItem key={'operator'} value={'operator'}>
              Operador
              </MenuItem>
              <MenuItem key={'maintenance'} value={'maintenance'}>
              Mantenedor
              </MenuItem>
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading || success}
              className={clsx(classes.submit, { [classes.buttonSuccess]: success })}
            >
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

            Registrar
            </Button>
          </form>
        </div>
        <Grid container>
          <Grid item xs>
          </Grid>
          <Grid item>
            <Link href="#" onClick={() => history.push('/auth/login')} variant="body2">
          Voltar para o Login
            </Link>
          </Grid>
        </Grid>
        <Box mt={8}>
          <Typography variant="body2" color="textSecondary" align="center">
          Em desenvolvimento por: PACM
          </Typography>
        </Box>
        <Snackbar
          open={error}
          onClose={() => setError(false)}
          autoHideDuration={3000}
          message="Falha ao criar o usuario! Por favor revise os dados inseridos e tente novamente." />
        <Snackbar
          open={success}
          onClose={() => setSuccess(false)}
          autoHideDuration={3000}
          message="Usuário criado com sucesso! Você
        será redirecionado em instantes!" />
      </Container>
    </TransitionWrapper>
  )
}
