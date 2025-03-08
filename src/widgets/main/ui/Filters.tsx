import { useContext, useEffect, useState } from 'react'

import { currencies } from '../models'
import { FetchContext } from '../../../providers'
import { useDebounce } from '../../../hooks'
import { TCurrency } from '../../../shared/api/fetchCoins'

const Filters = () => {
	const { fetchProps, setFetchProps } = useContext(FetchContext)

	const [currentCurrency, setCurrentCurrency] = useState<TCurrency>(
		fetchProps.currency,
	)
	const [searchValue, setSearchValue] = useState<string>(
		fetchProps.search ?? '',
	)
	const debouncedSearchValue = useDebounce(searchValue, 600)

	useEffect(() => {
		setFetchProps(prev => ({
			...prev,
			currency: currentCurrency,
			search: debouncedSearchValue,
		}))
	}, [currentCurrency, debouncedSearchValue, setFetchProps])

	return (
		<div className='my-4'>
			<div className='flex flex-wrap items-center justify-between'>
				<label className='flex text-lg font-bold my-4 items-center gap-2'>
					Валюта:
					<select
						value={currentCurrency}
						onChange={e =>
							setCurrentCurrency(e.target.value as TCurrency)
						}
						className='outline-none p-1 border border-[#1e1f26] rounded-md flex gap-4'>
						{currencies.map((currency, index) => (
							<option
								value={currency}
								className='text-bg uppercase'
								key={index}>
								{currency.toUpperCase()}
							</option>
						))}
					</select>
				</label>
				<label className='flex flex-wrap items-center gap-2'>
					Поиск токена по названию:
					<input
						type='text'
						className='py-2 px-4 w-[200px] outline-none border-2 border-[#1e1f26]'
						placeholder='Название токена'
						onChange={e => setSearchValue(e.target.value)}
						value={searchValue}
					/>
				</label>
			</div>
		</div>
	)
}
export default Filters
