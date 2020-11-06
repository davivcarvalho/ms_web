import { Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import AppBarComponent from '../components/AppBarComponent'
import BottomNavigationComponent from '../components/BottomNavigationComponent'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  pageContainer: {
    marginTop: 65,
    paddingLeft: 20
  },
  tableFooter: {
    padding: 20
  }
})

export default function EquipmentSelect () {
  const classes = useStyles()

  const rows = [

  ]

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
                  <TableCell>Area</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.calories}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter >
                <TableRow className={classes.tableFooter}> Criar novo equipamento </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <BottomNavigationComponent />
    </>
  )
}
