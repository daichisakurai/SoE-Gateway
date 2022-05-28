import * as Type from './Type'

export interface ICorporation {
  customer_id: string
  SCD: string
  FMTCD: string
  SYSKPNN: string
  URISCD: string
  CSTCD: string
}

export interface CorporationTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ICorporation) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Type.Order
  orderBy: string
  rowCount: number
}

export interface ProductTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IProduct) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Type.Order
  orderBy: string
  rowCount: number
}

export interface HeadCell {
  disablePadding: boolean
  id: any
  label: string
  numeric: boolean
}

export interface IProduct {
  product_id: string
  SZJSUMCD: string
  IRESCD: string
  DCAT: string
  SCD: string
  FMTCD: string
  SYSKPNN: string
  ATSIUTAIKB: number
  KYK_AT_EXT_TSFL: number
  HB: string
  RQPTKB: number
}

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
