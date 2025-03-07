import { useContext } from 'react'

import { FetchContext } from '../../../providers'
import { IFetchData } from '../../shared/api/fetchCoins'
import {
	getCurrencyFormatter,
	getPercentageFormatter,
} from '../../../utils'

interface ITableBodyProps {
	data: IFetchData[]
}

const TableBody = ({ data }: ITableBodyProps) => {
	const { fetchProps } = useContext(FetchContext)

	const currencyformatter = getCurrencyFormatter(fetchProps.currency)
	const percentageformatter = getPercentageFormatter()

	return (
		<tbody>
			{data.map((data, index) => (
				<tr
					className='border-b hover:bg-[#0d1d2d] border-white/40'
					key={data.name}>
					<td className='p-5'>
						{fetchProps.perPage * (fetchProps.page - 1) + index + 1}
					</td>
					<td className='p-5'>{data.name}</td>
					<td className='p-5'>
						{currencyformatter.format(data.total_volume)}
					</td>
					<td className='p-5'>
						{currencyformatter.format(data.market_cap)}
					</td>
					<td className='p-5'>
						{currencyformatter.format(data.current_price)}
					</td>
					<td className='p-5'>
						{percentageformatter.format(
							data.market_cap_change_percentage_24h / 100,
						)}
					</td>
					<td className='p-5'>
						{percentageformatter.format(
							data.price_change_percentage_24h / 100,
						)}
					</td>
					<td className='p-5'>
						{currencyformatter.format(data.low_24h)}
					</td>
					<td className='p-5'>
						{currencyformatter.format(data.high_24h)}
					</td>
				</tr>
			))}
		</tbody>
	)
}
export default TableBody
