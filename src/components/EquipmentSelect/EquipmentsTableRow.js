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
  equipment = {},
  onDelete = () => {},
  onEdit = () => {}
}) => (

  <TableRow >
    <TableCell></TableCell>
    <TableCell>{ equipment.name }</TableCell>
    <TableCell>{ equipment.label }</TableCell>
    <TableCell>{ equipment.description }</TableCell>
    <TableCell align="right"><EquipmentTableActions subEquipment onDelete={() => onDelete(equipment.id)} onEdit={(child) => onEdit(equipment.id, child)}/></TableCell>
  </TableRow>

)

export function EquipmentsTableRow ({
  equipment = {},
  onDelete = () => {},
  onEdit = () => {}
}) {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()
  return (
    <React.Fragment>
      <TableRow className={classes.root} >
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
        <TableCell align="right"><EquipmentTableActions onDelete={() => onDelete(equipment.id)} onEdit={(child) => onEdit(equipment.id, child)}/></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
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
                  { equipment.childrens && equipment.childrens.map(equipment => (

                    <SubEquipmentsTableRow key={equipment.id} equipment={equipment} onDelete={onDelete} onEdit={onEdit} />

                  ))}
                </TableBody>
              </Table>

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
