import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { CartReducer } from './slices/cart.slice'

const rootReducer = combineReducers({
	cart: CartReducer,
})

export const store = configureStore({
	reducer: rootReducer,
})
