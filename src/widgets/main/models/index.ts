import { TCurrency } from '../../shared/api/fetchCoins'

export const currencies: TCurrency[] = ['usd', 'eur', 'rub']

export const tableHeaders = [
	'#',
	'Symbol',
	'Total Volume',
	'Market Cap',
	'Price',
	'%Cap (24h)',
	'%Price (24h)',
	'Low (24h)',
	'High (24h)',
]
