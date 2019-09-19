import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import Cashier from '../_reducers/Cashier'
import Product from '../_reducers/Product'
import Transaction from '../_reducers/Transaction'
import Order from '../_reducers/Order'

// this global states
const reducers = combineReducers({
  Cashier,Product,Transaction,Order
})
export default Store = createStore(
  reducers,
  applyMiddleware(promise, logger)
)  