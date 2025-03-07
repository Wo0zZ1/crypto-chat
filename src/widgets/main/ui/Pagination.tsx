import { useCallback, useContext, useState } from 'react'
import { FetchContext } from '../../../providers'

const MOCKCOUNTOFCOINS = 17178

const Pagination = () => {
	const { fetchProps, setFetchProps } = useContext(FetchContext)

	const countOfPages = Math.ceil(
		MOCKCOUNTOFCOINS / fetchProps.perPage,
	)

	const setPage = useCallback(
		(page: number) => {
			setFetchProps(prev => ({
				...prev,
				page,
			}))
		},
		[setFetchProps],
	)

	return (
		<div className='w-full my-4'>
			<div className='flex flex-col gap-4'>
				<label className='flex items-center gap-4 ml-auto'>
					Количество токенов на странице
					<select
						onChange={e =>
							setFetchProps(prev => ({
								...prev,
								perPage: +e.target.value,
							}))
						}
						className='outline-none p-1 border border-[#1e1f26] rounded-md flex gap-4'
						value={fetchProps.perPage}>
						<option className='text-bg uppercase'>5</option>
						<option className='text-bg uppercase'>10</option>
						<option className='text-bg uppercase'>15</option>
						<option className='text-bg uppercase'>25</option>
					</select>
				</label>
				<div className='flex items-center gap-3 mx-auto'>
					<button
						onClick={() => setPage(fetchProps.page - 1)}
						className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-btn hover:bg-orange transition-colors'>
						{'<'}
					</button>
					<button
						onClick={() => setPage(1)}
						style={{
							backgroundColor:
								fetchProps.page === 1 ? 'var(--color-orange)' : '',
						}}
						className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-btn hover:bg-btn-hover transition-colors'>
						1
					</button>
					{fetchProps.page - 1 >= 2 && (
						<button
							onClick={() => setPage(fetchProps.page - 1)}
							style={{
								backgroundColor:
									fetchProps.page === fetchProps.page - 1
										? 'var(--color-orange)'
										: '',
							}}
							className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-btn hover:bg-btn-hover transition-colors'>
							{fetchProps.page - 1}
						</button>
					)}
					{2 <= fetchProps.page &&
						fetchProps.page <= countOfPages - 1 && (
							<button className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-orange transition-colors'>
								{fetchProps.page}
							</button>
						)}
					{fetchProps.page + 1 <= countOfPages - 1 && (
						<button
							onClick={() => setPage(fetchProps.page + 1)}
							style={{
								backgroundColor:
									fetchProps.page === fetchProps.page + 1
										? 'var(--color-orange)'
										: '',
							}}
							className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-btn hover:bg-btn-hover transition-colors'>
							{fetchProps.page + 1}
						</button>
					)}
					<button
						onClick={() => setPage(countOfPages)}
						style={{
							backgroundColor:
								fetchProps.page === countOfPages
									? 'var(--color-orange)'
									: '',
						}}
						className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-btn hover:bg-btn-hover transition-colors'>
						{countOfPages}
					</button>
					<button
						onClick={() => setPage(fetchProps.page + 1)}
						className='flex items-center justify-center min-w-[33px] min-h-[33px] font-bold text-sm cursor-pointer px-2 py-1 rounded-md bg-btn hover:bg-orange transition-colors'>
						{'>'}
					</button>
				</div>
			</div>
		</div>
	)
}
export default Pagination
