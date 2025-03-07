export default function debounce(fn: () => void, ms: number) {
	let timeoutId: number

	return function () {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(fn, ms)
	}
}
