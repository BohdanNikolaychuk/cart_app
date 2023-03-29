import { Page, Select, Text } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import { useCallback, useState } from 'react'
import { CartItem } from './components/CartItem/CartItem'
import { ModalWindow } from './components/Modal/Modal'
import { useAppSelector } from './store/hooks/redux.hook'

const options = [
	{ label: 'USD', value: 'USD' },
	{ label: 'EUR', value: 'EUR' },
	{ label: 'JPY', value: 'JPY' },
]

function App() {
	const [currency, setCurrency] = useState('USD')
	const cart = useAppSelector(state => state.cart.cart)

	const getTotal = () => {
		let totalPrice = 0
		if (currency === 'USD') {
			cart.forEach(item => {
				if (item.currency !== 'USD') {
					totalPrice += +item.price * item.quantity * 1.08
				} else {
					totalPrice += +item.price * item.quantity
				}
			})
		}
		if (currency === 'EUR') {
			cart.forEach(item => {
				if (item.currency !== 'EUR') {
					totalPrice += +item.price * item.quantity * 0.92
				} else {
					totalPrice += +item.price * item.quantity
				}
			})
		}

		return { totalPrice }
	}

	const handleChangeProductCurrency = useCallback(
		(newValue: string) => setCurrency(newValue),
		[]
	)

	return (
		<Page title='Ex'>
			{!cart.length && <>Your cart empty</>}

			{cart.map(product => (
				<CartItem key={product.id} {...product} />
			))}

			<div style={{ display: 'flex' }}>
				<Text variant='headingXl' as='h1'>
					Price:{getTotal().totalPrice}
				</Text>
			</div>
			<Select
				label='Final currency'
				options={options}
				onChange={handleChangeProductCurrency}
				value={currency}
			/>

			<ModalWindow />
		</Page>
	)
}

export default App
