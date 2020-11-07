import { Button, Grid, makeStyles, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import Paper from '@material-ui/core/Paper'
import LoadingComponent from '../components/LoadingComponent'

import http from '../helpers/http'
import ActionsComponent from '../components/EquipmentDashBoard/ActionsComponent'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pageContainer: {
    marginTop: 90,
    paddingLeft: 20
  },
  tableFooter: {
    padding: 20
  }
})

export default function EquipmentSelect () {
  const classes = useStyles()
  const [equipments, setEquipments] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  const rows = []

  useEffect(() => {
    http.get('/equipments')
      .then(response => {
        const { equipments } = response.data
        setLoading(false)
        if (!equipments) return
        setEquipments(equipments)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <AppBarComponent title="Equipamento"/>
      <Grid container className={classes.pageContainer}>
        <Grid item>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>TAG</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {equipments && equipments.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.label}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">
                      <ActionsComponent />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter >
                <TableRow className={classes.tableFooter}>
                  <TableCell align="left">
                    <Button variant="outlined" color="primary">
                      Novo
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <BottomNavigationComponent />
      <LoadingComponent open={loading}/>
      <Snackbar open={error} onClose={() => setError(null)} autoHideDuration={3000} message={error && error.message} />

    </>
  )
}
