import { createContext } from 'react'
import * as Interface from '../models/Interface'
import { InitialProduct } from '../models/InitialProperty'

/**
 * 商品情報コンテキスト
 */
const ProdInfoContext = createContext<Interface.IProduct[]>(InitialProduct)

export default ProdInfoContext
