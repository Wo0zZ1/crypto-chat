import { createRoot } from 'react-dom/client'
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'

import './index.css'

import { FetchProvider } from './providers/FetchProvider.tsx'

import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<FetchProvider>
			<App />
		</FetchProvider>
	</QueryClientProvider>,
)
