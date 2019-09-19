import axios from 'axios'
import Constanta from '../res/Constant'

export const getCashierAxios = (user,pass) => {
  return {
    type:'GET_CASHIER',
    payload : axios.get(`${Constanta.host}/cashier/user/${user}/pass/${pass}`)
  }
}
export const getCashierAxiosById = (id) => {
  return {
    type:'GET_CASHIER',
    payload : axios.get(`${Constanta.host}/cashier/${id}`)
  }
}
export const cashierLogout = () => {
  return {
    type:'CASHIER_LOGOUT'
  }
}