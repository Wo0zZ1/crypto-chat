import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, ms: number) {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value)
		}, ms)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [value, ms])

	return debouncedValue
}

export default useDebounce
