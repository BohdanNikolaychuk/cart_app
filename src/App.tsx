import { Page, Select, Text } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import { useCallback, useState } from 'react'
import { CartItem } from './components/CartItem/CartItem'
import { ModalWindow } from './components/Modal/Modal'
import { useAppSelector } from './store/hooks/redux.hook'
import { getTotalPrice } from './utils/getTotalPrice'

const options = [
	{ label: 'USD', value: 'USD' },
	{ label: 'EUR', value: 'EUR' },
	{ label: 'JPY', value: 'JPY' },
]

function App() {
	const [currency, setCurrency] = useState('USD')
	const [active, setActive] = useState(false)
	const handleChange = useCallback(() => setActive(!active), [active])
	const cart = useAppSelector(state => state.cart.cart)

	const totalPrice = getTotalPrice(currency, cart).totalPrice

	const handleChangeProductCurrency = useCallback(
		(newValue: string) => setCurrency(newValue),
		[]
	)

	return (
		<>
			<Page title=''>
				{!cart.length && <>Your cart empty</>}

				{cart.map(product => (
					<CartItem key={product.id} {...product} />
				))}

				<div style={{ display: 'flex', margin: '20px' }}>
					<Text variant='headingXl' as='h1'>
						Price:{totalPrice}
					</Text>
				</div>

				<Select
					label='Final currency'
					options={options}
					onChange={handleChangeProductCurrency}
					value={currency}
				/>

				<ModalWindow
					handleChange={handleChange}
					setActive={setActive}
					active={active}
				/>
			</Page>
		</>
	)
}

export default App
