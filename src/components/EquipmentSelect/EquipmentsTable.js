import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { EquipmentsTableRow } from './EquipmentsTableRow'

export default function EquipmentsTable ({
  equipments
}) {
  if (!equipments) {
    return (
      <Paper style={{ padding: 20 }}>
        <Typography variant="body1">
          Nenhum equipamento cadastrado!
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper} style={{ padding: 20 }} >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome</TableCell>
            <TableCell >TAG</TableCell>
            <TableCell >Descrição</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { equipments.map(equipment => (
            <EquipmentsTableRow key={equipment.id} equipment={equipment}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
