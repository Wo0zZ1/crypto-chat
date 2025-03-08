import { createContext, ReactNode } from 'react'
import { useLocalStorage } from '../hooks'

interface IAsideContext {
	active: boolean
	setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const initialValue: boolean = true

const AsideContext = createContext<IAsideContext>({
	active: initialValue,
	setActive: () => {},
})

interface IFetchProviderProps {
	children: ReactNode
}

const AsideProvider = ({ children }: IFetchProviderProps) => {
	const [active, setActive] = useLocalStorage<boolean>(
		'asideData',
		initialValue,
	)

	return (
		<AsideContext.Provider value={{ active, setActive }}>
			{children}
		</AsideContext.Provider>
	)
}

export { AsideProvider, AsideContext }
