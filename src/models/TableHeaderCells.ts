import * as Interface from './Interface'

export const CorporationHeadCells: readonly Interface.HeadCell[] = [
  {
    id: 'customer_id',
    numeric: false,
    disablePadding: true,
    label: '販売先ID'
  },
  {
    id: 'SCD',
    numeric: false,
    disablePadding: false,
    label: '決算単位コード'
  },
  {
    id: 'FMTCD',
    numeric: false,
    disablePadding: false,
    label: '組織コード'
  },
  {
    id: 'SYSKPNN',
    numeric: false,
    disablePadding: false,
    label: '担当者コード'
  },
  {
    id: 'URISCD',
    numeric: false,
    disablePadding: false,
    label: '売上先コード'
  },
  {
    id: 'CSTCD',
    numeric: false,
    disablePadding: false,
    label: '顧客コード'
  }
]

export const ProductHeadCells: readonly Interface.HeadCell[] = [
  {
    id: 'product_id',
    numeric: false,
    disablePadding: true,
    label: '商品ID'
  },
  {
    id: 'SZJSUMCD',
    numeric: false,
    disablePadding: false,
    label: '商材区分'
  },
  {
    id: 'IRESCD',
    numeric: false,
    disablePadding: false,
    label: '仕入先コード'
  },
  {
    id: 'DCAT',
    numeric: false,
    disablePadding: false,
    label: 'DCAT'
  },
  {
    id: 'SCD',
    numeric: false,
    disablePadding: false,
    label: '引渡決算単位コード'
  },
  {
    id: 'FMTCD',
    numeric: false,
    disablePadding: false,
    label: '引渡組織コード'
  },
  {
    id: 'SYSKPNN',
    numeric: false,
    disablePadding: false,
    label: '引渡担当者コード'
  },
  {
    id: 'ATSIUTAIKB',
    numeric: false,
    disablePadding: false,
    label: '自動処理区分'
  },
  {
    id: 'KYK_AT_EXT_TSFL',
    numeric: false,
    disablePadding: false,
    label: '契約自動延長対象区分'
  },
  {
    id: 'HB',
    numeric: false,
    disablePadding: false,
    label: '品番'
  },
  {
    id: 'RQPTKB',
    numeric: false,
    disablePadding: false,
    label: '請求パターン'
  }
]
