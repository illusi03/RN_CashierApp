initialStateTransaction = {
  dataItem: '',
  isLoading: false,
  dataItemAxios:[]
}

export default Transaction = (state = initialStateTransaction, action) => {
  switch (action.type) {
    case 'GET_TRANSACTION_PENDING':
      return {
        ...state,
        dataItemAxios:null,
        dataItem: null,
        isLoading: true
      }
      break
    case 'GET_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        dataItemAxios:null,
        isLoading: false
      }
      break
    case 'GET_TRANSACTION_REJECTED':
      return {
        ...state,
        dataItem: null,
        dataItemAxios:null,
        isLoading: false
      }
      break

    //For Add
    case 'POST_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'POST_TRANSACTION_FULFILLED':
      return {
        ...state,
        dataItemAxios: action.payload.data.data,
        isLoading: false
      }
      break
    case 'POST_TRANSACTION_REJECTED':
      return {
        ...state,
        isLoading: false
      }
      break

    //For Delete
    case 'DELETE_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'DELETE_TRANSACTION_FULFILLED':
      return {
        ...state,
        isLoading: false
      }
      break
    case 'DELETE_TRANSACTION_REJECTED':
      return {
        ...state,
        isLoading: false
      }
      break

    //For Patch
    case 'PATCH_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'PATCH_TRANSACTION_FULFILLED':
      return {
        ...state,
        isLoading: false
      }
      break
    case 'PATCH_TRANSACTION_REJECTED':
      return {
        ...state,
        isLoading: false
      }
      break
    default:
      return state
      break
  }
}