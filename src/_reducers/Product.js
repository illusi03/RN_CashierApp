initialStateProduct = {
  dataItem: '',
  dataItemMakanan: '',
  dataItemMinuman: '',
  isLoading: false,
}

export default Product = (state = initialStateProduct, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_PENDING':
      return {
        ...state,
        dataItem: null,
        dataItemMinuman: null,
        dataItemMakanan: null,
        isLoading: true
      }
      break
    case 'GET_PRODUCT_FULFILLED':
      return {
        ...state,
        dataItem: action.payload.data,
        dataItemMakanan: action.payload.data.filter((item) => {
          if (item.categoryId == 1) {
            return item
          }
        }),
        dataItemMinuman: action.payload.data.filter((item) => {
          if (item.categoryId == 2) {
            return item
          }
        }),
        isLoading: false
      }
      break
    case 'GET_PRODUCT_REJECTED':
      return {
        ...state,
        dataItem: null,
        dataItemMinuman: null,
        dataItemMakanan: null,
        isLoading: false
      }
      break

    //For Add
    case 'POST_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'POST_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false
      }
      break
    case 'POST_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false
      }
      break

    //For Delete
    case 'DELETE_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'DELETE_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false
      }
      break
    case 'DELETE_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false
      }
      break

    //For Patch
    case 'PATCH_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true
      }
      break
    case 'PATCH_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false
      }
      break
    case 'PATCH_PRODUCT_REJECTED':
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