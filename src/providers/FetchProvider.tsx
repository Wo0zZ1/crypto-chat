import { createContext, ReactNode } from 'react'
import { useLocalStorage } from '../hooks'
import { IFetchCoinsParams } from '../shared/api/fetchCoins'

interface IFetchContext {
	fetchProps: IFetchCoinsParams
	setFetchProps: React.Dispatch<
		React.SetStateAction<IFetchCoinsParams>
	>
}

const initialValue: IFetchCoinsParams = {
	currency: 'usd',
	filter: {
		direction: 'desc',
		name: 'market_cap',
	},
	page: 1,
	perPage: 5,
	search: '',
}

const FetchContext = createContext<IFetchContext>({
	fetchProps: initialValue,
	setFetchProps: () => {},
})

interface IFetchProviderProps {
	children: ReactNode
}

const FetchProvider = ({ children }: IFetchProviderProps) => {
	const [fetchProps, setFetchProps] =
		useLocalStorage<IFetchCoinsParams>('fetchData', initialValue)

	return (
		<FetchContext.Provider value={{ fetchProps, setFetchProps }}>
			{children}
		</FetchContext.Provider>
	)
}

export { FetchProvider, FetchContext }
