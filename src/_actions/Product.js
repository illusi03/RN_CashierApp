import axios from 'axios'
import Constanta from '../res/Constant'

export const getProductAxios = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get(`${Constanta.host}/products`)
  }
}
export const addProductAxios = (dataJadi) => {
  return {
    type: 'POST_PRODUCT',
    payload: axios({
      url: `${Constanta.host}/product`,
      method: 'POST',
      data: dataJadi,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const deleteProductAxios = (id) => {
  return {
    type: 'DELETE_PRODUCT',
    payload: axios({
      url: `${Constanta.host}/product/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const editProductAxios = (id,dataJadi) => {
  return {
    type: 'PATCH_PRODUCT',
    payload: axios({
      url: `${Constanta.host}/product/${id}`,
      method: 'PATCH',
      data: dataJadi,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}