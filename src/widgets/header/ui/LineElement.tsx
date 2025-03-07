import {
	getCurrencyFormatter,
	getPercentageFormatter,
} from '../../../utils'

import { IFetchData } from '../../../shared/api'

const LineElement = ({
	current_price,
	image,
	price_change_percentage_24h,
	symbol,
}: IFetchData) => {
	const currencyFormatter = getCurrencyFormatter('usd')
	const percentageFormatter = getPercentageFormatter()

	return (
		<div className='min-w-[220px] relative flex items-center justify-center gap-2 p-4 text-primary text-sm after:absolute after:right-0 after:w-0.5 after:bg-[#6b6b6b] after:h-1/3'>
			<img className='w-4 h-4' src={image} alt='icon' />
			<span>
				<strong>{symbol.toUpperCase()}</strong>
			</span>
			<span>{currencyFormatter.format(current_price)}</span>
			<span
				style={{
					color:
						price_change_percentage_24h >= 0 ? '#093' : '#ff333a',
				}}>
				(
				{percentageFormatter.format(
					price_change_percentage_24h / 100,
				)}
				)
			</span>
		</div>
	)
}
export default LineElement
