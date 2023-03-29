import { createSlice } from '@reduxjs/toolkit'
import { Cart, CartProduct } from '../types/cart.types'

const initialState: Cart = {
	cart: [],
}

const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const cartItem = state.cart.find((item: CartProduct) => {
				item.id === action.payload.id
			})
			if (!cartItem) {
				state.cart.push({
					...action.payload,
					quantity: action.payload.quantity,
				})
			} else {
				cartItem.quantity++
			}
		},
		removeItem: (state, action) => {
			const removeItem = state.cart.filter(item => item.id !== action.payload)
			state.cart = removeItem
		},
		incrementQuantity: (state, action) => {
			const cartItem = state.cart.find(item => item.id === action.payload)

			cartItem!.quantity++
		},
		decrementQuantity: (state, action) => {
			const cartItem = state.cart.find(item => item.id === action.payload)
			if (cartItem!.quantity === 1) {
				cartItem!.quantity = 1
			} else {
				cartItem!.quantity--
			}
		},
	},
})

export const { reducer: CartReducer, actions: CartActions } = CartSlice
