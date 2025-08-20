import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./index.css"
import TokenContextProvider from './context/tokenContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient= new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <TokenContextProvider>
                <App />
        </TokenContextProvider>
    </QueryClientProvider>
)
