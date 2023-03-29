export interface Cart {
	cart: CartProduct[]
}

export interface CartProduct {
	id: string
	name: string
	quantity: number
	currency: string
	price: string
}
