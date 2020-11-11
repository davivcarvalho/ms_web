import React from 'react'

import { Box, Collapse, IconButton, makeStyles, Table, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
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
  row = {
    calories: 1
  }
}) => (
  <Table size="small">
    <TableHead>
      <TableRow >
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell ></TableCell>
        <TableCell ></TableCell>
        <TableCell align="right"></TableCell>
      </TableRow>
    </TableHead>
    <TableRow >
      <TableCell></TableCell>

      <TableCell >
      Teste
      </TableCell>
      <TableCell >Teste</TableCell>
      <TableCell >teste</TableCell>
      <TableCell align="right"><EquipmentTableActions /></TableCell>
    </TableRow>
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
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
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
              <SubEquipmentsTableRow />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
