import { ReactNode } from 'react'

import Header from '../widgets/header'

interface IMainLayoutProps {
	children: ReactNode
}

const MainLayout = ({ children }: IMainLayoutProps) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	)
}
export default MainLayout
