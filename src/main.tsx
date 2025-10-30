import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppDesignProvider } from './design'
//import './index.css'
import Router from './Router'

createRoot(document.getElementById('root')!).render(
  <AppDesignProvider>
  <StrictMode>
    <Router />
  </StrictMode>,
  </AppDesignProvider>
)
