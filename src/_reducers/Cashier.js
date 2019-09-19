initialStateCashier = {
  dataItem: '',
  isLoading: false,
  isLogin: false
}

export default Cashier = (state = initialStateCashier, action) => {
  switch (action.type) {
    case 'GET_CASHIER':
      return {
        ...state,
        dataItem: null,
        isLoading: true
      }
      break
    case 'GET_CASHIER_FULFILLED':
      if (action.payload.data != "") {
        return {
          ...state,
          dataItem: action.payload.data,
          isLoading: false,
          isLogin: true
        }
      } else {
        return {
          ...state
        }
      }
      break
    case 'GET_CASHIER_REJECTED':
      return {
        ...state,
        dataItem: null,
        isLoading: false
      }
      break
    case 'CASHIER_LOGOUT':
      return {
        ...state,
        dataItem: null,
        isLoading: false,
        isLogin:false
      }
      break
    default:
      return state
      break
  }
}