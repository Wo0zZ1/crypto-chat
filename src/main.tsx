import { createRoot } from 'react-dom/client'
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

import './index.css'

import { FetchProvider } from './providers/FetchProvider.tsx'

import App from './App.tsx'
import { AsideProvider } from './providers/AsideProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<AsideProvider>
			<FetchProvider>
				<App />
			</FetchProvider>
		</AsideProvider>
	</QueryClientProvider>,
)
