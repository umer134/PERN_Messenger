import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'

import { store } from './app/providers/store.js'

import { QueryProvider } from './app/providers/query-provider.tsx'

import { AuthProvider } from './app/providers/auth-provider.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </Provider>
  </StrictMode>,
)
