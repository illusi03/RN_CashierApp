initialStateOrder = {
  dataItem: [],
  isLoading: false,
}

export default Order = (state = initialStateOrder, action) => {
  switch (action.type) {
    case 'SET_ORDER_BIASA':
      return {
        ...state,
        dataItem: action.payload,
        isLoading: false
      }
      break
    case 'REMOVE_ORDER_BIASA':
      return {
        ...state,
        dataItem: [],
        isLoading: false
      }
      break
    //For Add
    case 'POST_ORDER_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'POST_ORDER_FULFILLED':
      return {
        ...state,
        dataItem:[],
        isLoading: false
      }
      break
    case 'POST_ORDER_REJECTED':
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