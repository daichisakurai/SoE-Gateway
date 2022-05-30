import { createContext } from 'react'
import * as Interface from '../models/Interface'
import { InitialCorporation } from '../models/InitialProperty'


/**
 * 組織・従業員情報コンテキスト
 */
const CorpInfoContext = createContext<Interface.ICorporation[]>(InitialCorporation)

export default CorpInfoContext