import Marquee from 'react-fast-marquee'

import { LineElement } from './'
import { IFetchData } from '../../../shared/api'

interface IRunningLineProps {
	lineElements: IFetchData[] | undefined
	isError: boolean
}

const RunningLine = ({
	lineElements,
	isError,
}: IRunningLineProps) => {
	if (isError)
		return (
			<span className='font-bold text-2xl text-center m-auto'>
				Ошибка загрузки данных
			</span>
		)

	return (
		<Marquee pauseOnHover={true} autoFill={true}>
			{lineElements?.map((lineElement, index) => (
				<LineElement key={index} {...lineElement} />
			))}
		</Marquee>
	)
}

export default RunningLine
