import React from 'react'

import { Box, Collapse, IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import EquipmentTableActions from './EquipmentTableActions'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

const SubEquipmentsTableRow = ({
  equipment = {}
}) => (
  <Table size="small" style={{ marginBottom: 25 }}>
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        <TableCell>Nome</TableCell>
        <TableCell>TAG</TableCell>
        <TableCell>Descrição</TableCell>
        <TableCell align="right">Ações</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow >
        <TableCell></TableCell>
        <TableCell>{ equipment.name }</TableCell>
        <TableCell>{ equipment.label }</TableCell>
        <TableCell>{ equipment.description }</TableCell>
        <TableCell align="right"><EquipmentTableActions /></TableCell>
      </TableRow>
    </TableBody>
  </Table>
)

export function EquipmentsTableRow ({
  equipment = {}
}) {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        { equipment.childrens
          ? (
            <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
          )
          : <TableCell />
        }
        <TableCell component="th" scope="row">
          {equipment.name}
        </TableCell>
        <TableCell >{equipment.label}</TableCell>
        <TableCell >{equipment.description}</TableCell>
        <TableCell align="right"><EquipmentTableActions /></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              { equipment.childrens && equipment.childrens.map(equipment =>
                <SubEquipmentsTableRow key={equipment.id} equipment={equipment} />
              )}

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
