import axios from 'axios'
import Constanta from '../res/Constant'

export const getTransactionAxios = () => {
  return {
    type: 'GET_TRANSACTION',
    payload: axios.get(`${Constanta.host}/transactions`)
  }
}
export const addTransactionAxios = (dataJadi) => {
  return {
    type: 'POST_TRANSACTION',
    payload: axios({
      url: `${Constanta.host}/transaction`,
      method: 'POST',
      data: dataJadi,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const deleteTransactionAxios = (id) => {
  return {
    type: 'DELETE_TRANSACTION',
    payload: axios({
      url: `${Constanta.host}/transaction/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
export const editTransactionAxios = (id,dataJadi) => {
  return {
    type: 'PATCH_TRANSACTION',
    payload: axios({
      url: `${Constanta.host}/transaction/${id}`,
      method: 'PATCH',
      data: dataJadi,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}