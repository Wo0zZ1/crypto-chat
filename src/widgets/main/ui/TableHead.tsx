import { useCallback, useContext } from 'react'

import arrowUp from '../assets/icons8-sort-up-48.png'
import arrowDown from '../assets/icons8-sort-down-48.png'

import { FetchContext } from '../../../providers'

import { tableHeaders } from '../models'
import { paramToFilter } from '../../../utils'

const TableHead = () => {
	const { fetchProps, setFetchProps } = useContext(FetchContext)

	const paramHandler = useCallback(
		(param: string) => {
			const filterName = paramToFilter(param)
			if (!filterName) return
			setFetchProps(prev => ({
				...prev,
				filter: {
					name: filterName,
					direction:
						prev.filter.name === filterName
							? prev.filter.direction === 'asc'
								? 'desc'
								: 'asc'
							: 'desc',
				},
			}))
		},
		[setFetchProps],
	)

	const getSaturate = useCallback(
		(param: string, arrow: 'up' | 'down') => {
			const filterName = paramToFilter(param)
			if (!filterName || filterName !== fetchProps.filter.name)
				return 0
			return fetchProps.filter.direction ===
				(arrow === 'down' ? 'desc' : 'asc')
				? 100
				: 0
		},
		[fetchProps.filter],
	)

	return (
		<thead>
			<tr className='select-none border-b bg-[#1e1f26] border-white/80'>
				{tableHeaders.map((param, index) => (
					<th
						key={index}
						onClick={() => paramHandler(param)}
						className='hover:bg-[#14151a] cursor-pointer p-5'>
						<div className='mx-auto w-max flex gap-4 items-center justify-center'>
							<p>{param}</p>
							<div
								style={{
									display:
										param === 'Market Cap' || param === 'Total Volume'
											? 'block'
											: 'none',
								}}>
								<img
									style={{
										filter: `saturate(${getSaturate(param, 'up')}%)`,
									}}
									className={'w-3'}
									src={arrowUp}
									alt='sortArrow'
								/>
								<img
									style={{
										filter: `saturate(${getSaturate(
											param,
											'down',
										)}%)`,
									}}
									className='w-3'
									src={arrowDown}
									alt='sortDown'
								/>
							</div>
						</div>
					</th>
				))}
			</tr>
		</thead>
	)
}
export default TableHead
