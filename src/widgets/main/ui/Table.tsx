import { useCallback, useContext } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { TableHead, TableBody } from './'
import { FetchContext } from '../../../providers'
import { fetchCoins, IFetchData } from '../../../shared/api'

const Table = () => {
	const { fetchProps } = useContext(FetchContext)
	const queryClient = useQueryClient()

	const { data, isError, isLoading, error } = useQuery<IFetchData[]>({
		queryKey: ['coins', fetchProps],
		queryFn: () => fetchCoins(fetchProps),
		retry: 0,
	})

	const updateData = useCallback(() => {
		queryClient.invalidateQueries({ queryKey: ['coins'] })
	}, [queryClient])

	return (
		<div className='overflow-x-auto my-4'>
			<table className='table-fixed text-center'>
				<TableHead />
				{!isLoading && data && <TableBody data={data} />}
			</table>
			{isError && (
				<div className='w-full py-8 flex flex-col items-center justify-center gap-4'>
					<span className='text-3xl font-bold'>
						Ошибка: {error.message}
					</span>
					<button
						className='py-4 px-6 font-bold text-2xl rounded-md cursor-pointer bg-[#2e3361] hover:bg-[#27293a] transition-colors'
						onClick={updateData}>
						Обновить
					</button>
				</div>
			)}
			{!isError && isLoading && (
				<div className='w-full py-8 flex flex-col items-center justify-center'>
					<span className='text-3xl font-bold'>Загрузка...</span>
				</div>
			)}
			{!isError && !isLoading && !data && (
				<div className='w-full py-8 flex flex-col items-center justify-center gap-4'>
					<span className='text-3xl font-bold'>Нет данных...</span>
					<button
						className='py-4 px-6 font-bold text-2xl rounded-md cursor-pointer bg-[#2e3361] hover:bg-[#27293a] transition-colors'
						onClick={updateData}>
						Обновить
					</button>
				</div>
			)}
		</div>
	)
}
export default Table
