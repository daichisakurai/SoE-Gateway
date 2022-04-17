import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { visuallyHidden } from '@mui/utils'
import * as tUtil from '../../utils/TableUtil'
import * as Interface from '../../models/Interface'
import * as Type from '../../models/Type'
import { ProductHeadCells } from '../../models/TableHeaderCells'
import { ProdInfoContext } from './Product'

const EnhancedTableHead = (props: Interface.ProductTableProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Interface.IProduct) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserst'
            }}
          />
        </TableCell>
        {ProductHeadCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const ProductTable: React.VFC = () => {
  const [order, setOrder] = useState<Type.Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Interface.IProduct>('product_id')
  const [selected, setSelected] = useState<readonly string[]>([])
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const corpData = useContext(ProdInfoContext)

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Interface.IProduct
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = corpData.map((n) => n.product_id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (_event: React.MouseEvent<unknown>, product_id: string) => {
    const selectedIndex = selected.indexOf(product_id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product_id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (customer_id: string) => selected.indexOf(customer_id) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - corpData.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={corpData.length}
            />
            <TableBody>
              {tUtil
                .stableSort(corpData, tUtil.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.product_id)
                  const labelId = `product-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.product_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.product_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.product_id}
                      </TableCell>
                      <TableCell align="left">{row.SZJSUMCD}</TableCell>
                      <TableCell align="left">{row.IRESCD}</TableCell>
                      <TableCell align="left">{row.DCAT}</TableCell>
                      <TableCell align="left">{row.SCD}</TableCell>
                      <TableCell align="left">{row.FMTCD}</TableCell>
                      <TableCell align="left">{row.SYSKPNN}</TableCell>
                      <TableCell align="right">{row.ATSIUTAIKB}</TableCell>
                      <TableCell align="right">{row.KYK_AT_EXT_TSFL}</TableCell>
                      <TableCell align="left">{row.HB}</TableCell>
                      <TableCell align="right">{row.RQPTKB}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={12} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={corpData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default ProductTable
