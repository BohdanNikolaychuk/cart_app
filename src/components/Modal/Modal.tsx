import { AlphaStack, Button, Modal, Select, TextField } from '@shopify/polaris'
import { useCallback, useState } from 'react'
import ReactDOM from 'react-dom'
import { v4 as uuidv4 } from 'uuid'
import { useAppDispatch } from '../../store/hooks/redux.hook'
import { CartActions } from '../../store/slices/cart.slice'

const emptyField = {
	name: '',
	quantity: '0',
	currency: 'USD',
	price: '0',
}

const options = [
	{ label: 'USD', value: 'USD' },
	{ label: 'EUR', value: 'EUR' },
]

export const ModalWindow = () => {
	const [value, setValue] = useState(emptyField)

	const dispatch = useAppDispatch()
	const [active, setActive] = useState(false)
	const handleChange = useCallback(() => setActive(!active), [active])

	const addProductToCart = () => {
		const id = uuidv4()
		const newProduct = {
			id,
			name: value.name,
			quantity: value.quantity,
			currency: value.currency,
			price: value.price,
		}
		dispatch(CartActions.addToCart(newProduct))
		setActive(false)
		setValue(emptyField)
	}

	const handleChangeProductName = useCallback(
		(newValue: string) =>
			setValue(prev => ({
				...prev,
				name: newValue,
			})),
		[]
	)
	const handleChangeProductQuantity = useCallback(
		(newValue: string) =>
			setValue(prev => ({
				...prev,
				quantity: newValue,
			})),
		[]
	)

	const handleChangeProductCurrency = useCallback(
		(newValue: string) =>
			setValue(prev => ({
				...prev,
				currency: newValue,
			})),
		[]
	)

	const handleChangeProductPrice = useCallback(
		(newValue: string) =>
			setValue(prev => ({
				...prev,
				price: newValue,
			})),
		[]
	)

	const activator = <Button onClick={handleChange}>Add Item</Button>

	return ReactDOM.createPortal(
		<>
			<Modal
				activator={activator}
				open={active}
				onClose={handleChange}
				title='Add Item'
				primaryAction={{
					content: 'Create product',
					onAction: addProductToCart,
				}}
				secondaryActions={[
					{
						content: 'Close',
						onAction: handleChange,
					},
				]}
			>
				<Modal.Section>
					<AlphaStack>
						<TextField
							label='Product name'
							value={value.name}
							onChange={handleChangeProductName}
							autoComplete='off'
						/>
						<TextField
							label='Product price'
							type='number'
							value={value.price}
							onChange={handleChangeProductPrice}
							autoComplete='off'
						/>

						<TextField
							label='Product quantity'
							type='number'
							value={value.quantity}
							onChange={handleChangeProductQuantity}
							autoComplete='off'
						/>

						<Select
							label='Currency'
							options={options}
							onChange={handleChangeProductCurrency}
							value={value.currency}
						/>
					</AlphaStack>
				</Modal.Section>
			</Modal>
		</>,
		document.getElementById('app-modal') as HTMLElement
	)
}
