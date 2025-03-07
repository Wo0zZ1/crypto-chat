import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		const storageValue = localStorage.getItem(key)
		return storageValue ? JSON.parse(storageValue) : initialValue
	})

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue] as const
}

export default useLocalStorage
