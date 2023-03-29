import { CurrentCurrency } from '../common/currency'
import { CartProduct } from '../store/types/cart.types'

export const getTotalPrice = (currency: string, cart: CartProduct[]) => {
	let totalPrice = 0

	cart.forEach(item => {
		if (currency !== item.currency) {
			totalPrice +=
				+item.price * item.quantity * CurrentCurrency[item.currency][currency]
		} else {
			totalPrice += +item.price * item.quantity
		}
	})

	return { totalPrice }
}
