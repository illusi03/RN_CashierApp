import axios from 'axios'
import Constanta from '../res/Constant'

export const setOrderBiasa = (data) => {
  return {
    type: 'SET_ORDER_BIASA',
    payload: data
  }
}
export const removeOrderBiasa = () => {
  return {
    type: 'REMOVE_ORDER_BIASA'
  }
}
export const getOrderAxios = () => {
  return {
    type: 'GET_ORDER',
    payload: axios.get(`${Constanta.host}/transactionDetails`)
  }
}
export const addOrderAxios = (dataJadi) => {
  return {
    type: 'POST_ORDER',
    payload: axios({
      url: `${Constanta.host}/transactionDetail`,
      method: 'POST',
      data: dataJadi,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const deleteOrderAxios = (id) => {
  return {
    type: 'DELETE_ORDER',
    payload: axios({
      url: `${Constanta.host}/transactionDetail/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const editOrderAxios = (id, dataJadi) => {
  return {
    type: 'PATCH_ORDER',
    payload: axios({
      url: `${Constanta.host}/transactionDetail/${id}`,
      method: 'PATCH',
      data: dataJadi,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}