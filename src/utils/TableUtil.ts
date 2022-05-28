import * as Type from '../models/Type'

/**
 * 降順コンパレータ
 * @param {T} a 比較対象1
 * @param {T} b 比較対象2
 * @param {keyof T} orderBy 比較要素
 * @returns 比較結果
 */
export const descendingComparator = <T>(a: T, b: T, orderBy: keyof T): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

/**
 * テーブル行をソート
 * @param {T[]} array テーブル行の配列
 * @param {(a: T, b: T) => number} comparator コンパレータ
 * @returns ソート結果
 */
export function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number): T[] {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

/**
 *  コンパレータ
 * @param {Type.Order} order 昇順 or 降順
 * @param {Key} orderBy ソート要素
 * @returns 比較結果
 */
export function getComparator<Key extends keyof number | string | symbol>(
  order: Type.Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}
