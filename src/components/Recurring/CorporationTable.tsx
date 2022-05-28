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
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { visuallyHidden } from '@mui/utils'
import * as tUtil from '../../utils/TableUtil'
import * as Interface from '../../models/Interface'
import * as Type from '../../models/Type'
import { CorporationHeadCells } from '../../models/TableHeaderCells'
import { CorpInfoContext } from './Corporation'
import SearchForm from '../common/SearchForm'

/**
 * 組織従業員テーブルのヘッダを生成
 * @param {Interface.CorporationTableProps} props 組織従業員情報プロパティ
 * @returns 組織従業員テーブルのヘッダ
 */
const CorporationTableHead = (props: Interface.CorporationTableProps) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props
  const createSortHandler = (property: keyof Interface.ICorporation) => (
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
        {CorporationHeadCells.map((headCell) => (
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

/**
 * 組織従業員テーブル生成
 * @returns 組織従業員テーブル
 */
const CorporationTable: React.VFC = () => {
  /**
   * 昇順、降順のステートフック
   */
  const [order, setOrder] = useState<Type.Order>('asc')

  /**
   * 昇順、降順の要素のステートフック
   */
  const [orderBy, setOrderBy] = useState<keyof Interface.ICorporation>('customer_id')

  /**
   * チェックボックス選択のステートフック
   */
  const [selected, setSelected] = useState<readonly string[]>([])

  /**
   * テーブルページのステートフック
   */
  const [page, setPage] = useState<number>(0)

  /**
   * テーブル表示行のステートすっく
   */
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  /**
   * テーブル表示行のステートすっく
   */
  const corpData = useContext(CorpInfoContext)

  /**
   * 追加ダイアログのステートフック
   */
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)

  /**
   * 追加ボタン押下処理
   */
  const handleClickOpenAddDialog = () => {
    setOpenAddDialog(true)
  }

  /**
   * キャンセルボタン押下処理（追加ダイアログ）
   */
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false)
  }

  /**
   * ソートボタン押下処理
   * @param {React.MouseEvent<unknown>} _event イベントオブジェクト
   * @param {keyof Interface.ICorporation} property ソートする要素
   */
  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Interface.ICorporation
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  /**
   * 全選択ボタン押下処理
   * @param {React.ChangeEvent<HTMLInputElement>} event イベントオブジェクト
   * @returns 選択行のリスト
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = corpData.map((n) => n.customer_id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  /**
   * チェックボックス押下処理
   * @param {_event: React.MouseEvent<unknown>} _event イベントオブジェクト
   * @param {string} product_id 商品ID
   */
  const handleClickCheckbox = (_event: React.MouseEvent<unknown>, customer_id: string) => {
    const selectedIndex = selected.indexOf(customer_id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, customer_id)
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

  /**
   * テーブルページネーション押下処理
   * @param {unknown} _event イベントオブジェクト
   * @param {number} newPage テーブルページ
   */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  /**
   * テーブル表示行リスト押下処理
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  /**
   * チェックボックスで選択されているか返却
   * @param {string} product_id 商品ID
   * @returns true:選択, fals:未選択
   */
  const isSelected = (customer_id: string) => selected.indexOf(customer_id) !== -1

  /**
   * 空行
   */
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - corpData.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <SearchForm />
      <Box sx={{ width: '100%', height: '50px' }} />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <CorporationTableHead
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
                  const isItemSelected = isSelected(row.customer_id)
                  const labelId = `corporation-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClickCheckbox(event, row.customer_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.customer_id}
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
                        {row.customer_id}
                      </TableCell>
                      <TableCell align="left">{row.SCD}</TableCell>
                      <TableCell align="left">{row.FMTCD}</TableCell>
                      <TableCell align="left">{row.SYSKPNN}</TableCell>
                      <TableCell align="left">{row.URISCD}</TableCell>
                      <TableCell align="left">{row.CSTCD}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={7} />
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
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          onClick={handleClickOpenAddDialog}
          sx={{ margin: '10px', width: '122px' }}
        >
          追加
        </Button>
        <Button
          variant="contained"
          disabled={selected.length < 1 ? true : false}
          sx={{ margin: '10px', width: '122px' }}
        >
          削除
        </Button>
        <Button
          variant="contained"
          disabled={selected.length === 1 ? false : true}
          sx={{ marginLeft: '10px', width: '122px' }}
        >
          更新
        </Button>
      </Toolbar>
      <Dialog open={openAddDialog}>
        <DialogTitle>組織・従業員追加</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="customer_id"
            label="販売先ID"
            fullWidth
            variant="outlined"
          />
          <TextField margin="dense" id="SCD" label="決算単位コード" fullWidth variant="outlined" />
          <TextField margin="dense" id="FMTCD" label="組織コード" fullWidth variant="outlined" />
          <TextField
            margin="dense"
            id="SYSKPNN"
            label="担当者コード"
            fullWidth
            variant="outlined"
          />
          <TextField margin="dense" id="URISCD" label="売上先コード" fullWidth variant="outlined" />
          <TextField margin="dense" id="CSTCD" label="顧客コード" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>キャンセル</Button>
          <Button onClick={handleCloseAddDialog}>追加</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CorporationTable
