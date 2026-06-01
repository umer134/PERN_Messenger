import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.jsx'

import { store } from './app/providers/store.js'

import { QueryProvider } from './app/providers/query-provider.tsx'

import { AuthProvider } from './app/providers/auth-provider.tsx'

// ДОБАВЬТЕ ЭТИ ИМПОРТЫ:
import './shared/styles/global.css.ts';
import { themeClass } from './shared/styles/theme/theme.css.js';

document.body.classList.add(themeClass)

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