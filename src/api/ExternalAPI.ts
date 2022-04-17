import axios from 'axios'
import * as Interface from '../models/Interface'

const getProductsURL = 'https://wj7686wh08.execute-api.ap-northeast-1.amazonaws.com/v1/products'

const getCorporationURL = 'https://5dse4daami.execute-api.ap-northeast-1.amazonaws.com/v1/corp'

export const getProducts = async (): Promise<Interface.IProduct[]> => {
  const response = await axios.get<Interface.IProduct[]>(getProductsURL)
  return response.data
}

export const getCorporations = async (): Promise<Interface.ICorporation[]> => {
  const response = await axios.get<Interface.ICorporation[]>(getCorporationURL)
  return response.data
}
