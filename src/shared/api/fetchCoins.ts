import axios from 'axios'

export interface IFetchData {
	image: string
	name: string
	symbol: string
	total_volume: number
	market_cap: number
	current_price: number
	market_cap_change_percentage_24h: number
	price_change_percentage_24h: number
	low_24h: number
	high_24h: number
}

export type TFilterName = 'volume' | 'market_cap'
export type TFilterDirection = 'asc' | 'desc'

export type TCurrency = 'rub' | 'usd' | 'eur'

export interface IFilter {
	name: TFilterName | null
	direction: TFilterDirection
}

export interface IFetchCoinsParams {
	filter: IFilter
	currency: TCurrency
	perPage: number
	page: number
	search: string | null
}

export async function fetchCoins({
	currency,
	filter,
	page,
	perPage,
}: IFetchCoinsParams): Promise<IFetchData[]> {
	const { data } = await axios.get(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${filter.name}_${filter.direction}&per_page=${perPage}&page=${page}`,
	)

	return data
}

/**
 *
 * @param count количество токенов
 * @returns топ популярных токенов
 */
export async function fetchBaseCoins(
	count: number = 8,
): Promise<IFetchData[]> {
	const { data } = await axios.get(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=0`,
	)

	return data
}

export async function fetchCoinsByName({
	currency,
	filter,
	page,
	perPage,
}: IFetchCoinsParams): Promise<IFetchData[]> {
	// TODO IMPLEMENT THIS METHOD
	const { data } = await axios.get(
		`https://api.coingecko.com/api/v3/search?query=${currency}`,
	)

	return data
}
