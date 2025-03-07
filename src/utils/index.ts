import { TFilterName } from '../components/shared/api/fetchCoins'

export const paramToFilter = (param: string): TFilterName | null => {
	switch (param) {
		case 'Market Cap':
			return 'market_cap'
		case 'Total Volume':
			return 'volume'
		default:
			return null
	}
}

export const getCurrencyFormatter = (currency: string) => {
	const options: Intl.NumberFormatOptions = {
		currency,
		notation: 'compact',
		currencyDisplay: 'narrowSymbol',
		maximumFractionDigits: 3,
		signDisplay: 'auto',
		style: 'currency',
	}
	const formatter = new Intl.NumberFormat('en-EN', options)
	return formatter
}

export const getPercentageFormatter = () => {
	const options: Intl.NumberFormatOptions = {
		maximumFractionDigits: 2,
		signDisplay: 'always',
		style: 'percent',
	}
	const formatter = new Intl.NumberFormat('en-EN', options)
	return formatter
}
