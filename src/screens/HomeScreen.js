import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import { Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    padding: 10
  },
  image: {
    width: '17em'
  },
  title: {
    marginBottom: 10
  },
  infoText: {
    marginTop: 30
  }
}))

export default function HomeScreen () {
  const classes = useStyles()

  return (
    <Fragment>
      <AppBarComponent/>
      <Grid
        className={classes.pageContainer}
        container
        direction="column"
      >

        <Grid item>
          <Typography variant="h5" className={classes.title} >
            Aplicativo Manutenção
          </Typography>
          <Typography variant="subtitle1">
            Olá. Seja bem-vindo ao aplicativo de apoio a manutenção.
          </Typography>
          <Typography variant="body1">
          Para acessar os equipamentos ou gerenciar as solicitações faça{' '}
            <Link to='/auth/login'>Login</Link>
          </Typography>
          <Typography variant="body2" className={classes.infoText}>
            Aplicativo em desenvolvimento pela equipe de manutenção elétrica dos LC&apos;s - PACM
          </Typography>
        </Grid>
      </Grid>

      <BottomNavigationComponent/>
    </Fragment>
  )
}
