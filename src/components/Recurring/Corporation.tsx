import React, { useState, useEffect, createContext } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import CorporationTable from './CorporationTable'
import { getCorporations } from '../../api/ExternalAPI'
import * as Interface from '../../models/Interface'
import { InitialCorporation } from '../../models/InitialProperty'

/**
 * 組織・従業員情報コンテキスト
 */
export const CorpInfoContext = createContext<Interface.ICorporation[]>(InitialCorporation)

/**
 * 組織・従業員情報
 * @returns 組織・従業員情報ページ
 */
const Corporation: React.VFC = () => {
  /**
   * 組織・従業員情報のステートフック
   */
  const [corpInfo, setCorpInfo] = useState<Interface.ICorporation[]>(
    (function () {
      const storageData = sessionStorage.getItem('corpInfo')
      if (storageData !== null) {
        return JSON.parse(storageData)
      }
      return InitialCorporation
    })()
  )

  /**
   * ロード中のステートフック
   */
  const [isLoaded, setIsLoaded] = useState<boolean>(
    (function () {
      const storageData = sessionStorage.getItem('corpInfo')
      if (storageData !== null) {
        return true
      }
      return false
    })()
  )

  /**
   * 組織・従業員情報取得
   */
  const getCorpInfomation = async () => {
    setIsLoaded(false)
    await getCorporations()
      .then((result) => {
        setCorpInfo(result)
        sessionStorage.setItem('corpInfo', JSON.stringify(result))
      })
      .catch((error) => {
        console.error(error)
      })
    setIsLoaded(true)
  }

  /**
   * 初回レンダー時処理
   */
  useEffect(() => {
    if (!isLoaded) {
      getCorpInfomation()
    }
  }, [])

  return (
    <div>
      <CorpInfoContext.Provider value={corpInfo}>
        <CorporationTable />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoaded}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </CorpInfoContext.Provider>
    </div>
  )
}

export default Corporation
