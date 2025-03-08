import { useCallback, useContext } from 'react'
import { Filters, Pagination, Table } from './ui'
import { AsideContext } from '../../providers'
import { useDimension } from '../../hooks'

const Main = () => {
	const { active, setActive } = useContext(AsideContext)

	const { width } = useDimension()

	const clickHandler = useCallback(() => {
		if (width <= 800) setActive(false)
	}, [setActive, width])

	return (
		<main className='relative overflow-hidden px-4 mt-14'>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
			<Filters />
			<Table />
			<Pagination />
			<div
				style={{
					backgroundColor: '#0009',
					display: active && width <= 800 ? 'block' : 'none',
				}}
				onClick={clickHandler}
				className='absolute inset-0'></div>
		</main>
	)
}
export default Main
