import React, { useState, useEffect } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import * as Interface from '../../models/Interface'
import { InitialProduct } from '../../models/InitialProperty'
import { getProducts } from '../../api/ExternalAPI'
import ProductTable from './ProductTable'
import ProdInfoContext from '../../context/ProductData'

/**
 * 商品ページ
 * @returns 商品ページ
 */
const Product: React.VFC = () => {
  /**
   * 商品情報のステートフック
   */
  const [prodInfo, setProdInfo] = useState<Interface.IProduct[]>(
    (function () {
      const storageData = sessionStorage.getItem('prodInfo')
      if (storageData !== null) {
        return JSON.parse(storageData)
      }
      return InitialProduct
    })()
  )

  /**
   * ロード中のステートフック
   */
  const [isLoaded, setIsLoaded] = useState<boolean>(
    (function () {
      const storageData = sessionStorage.getItem('prodInfo')
      if (storageData !== null) {
        return true
      }
      return false
    })()
  )

  /**
   * 商品情報取得
   */
  const getProdInfomation = async () => {
    setIsLoaded(false)
    await getProducts()
      .then((result) => {
        setProdInfo(result)
        sessionStorage.setItem('prodInfo', JSON.stringify(result))
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
      getProdInfomation()
    }
  }, [])

  return (
    <div>
      <ProdInfoContext.Provider value={prodInfo}>
        <ProductTable />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={!isLoaded}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ProdInfoContext.Provider>
    </div>
  )
}

export default Product
