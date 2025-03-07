import { useQuery } from '@tanstack/react-query'

import { RunningLine } from './ui'
import { fetchBaseCoins } from '../../shared/api'

const Header = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['top_coins'],
		queryFn: () => fetchBaseCoins(8),
		refetchInterval: 60 * 1000,
		retry: 0,
	})

	return (
		<header className='sticky flex top-0 bg-header h-[55px] border-b border-[#16171c]'>
			{!isLoading && (
				<RunningLine isError={isError} lineElements={data} />
			)}
		</header>
	)
}
export default Header
