import { AlphaCard, Button, LegacyStack, Text } from '@shopify/polaris'
import { FC } from 'react'
import { useActionCreators } from '../../store/hooks/redux.hook'
import { CartActions } from '../../store/slices/cart.slice'
import { CartProduct } from '../../store/types/cart.types'

export const CartItem: FC<CartProduct> = ({
	id,
	name,
	quantity,
	currency,
	price,
}) => {
	const actions = useActionCreators(CartActions)

	const onIncrement = () => {
		actions.incrementQuantity(id)
	}
	const onDecrement = () => {
		actions.decrementQuantity(id)
	}

	return (
		<AlphaCard>
			<LegacyStack alignment='center'>
				<Text as='p'>{name}</Text>
				<Button onClick={onIncrement}>+</Button>
				<Text as='p'>QTY:{quantity}</Text>
				<Button onClick={onDecrement}>-</Button>
				<Text as='p'>Currency : {currency}</Text>
				<Text as='p'>Price : {price}</Text>
			</LegacyStack>
		</AlphaCard>
	)
}
