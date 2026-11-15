import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store/Store'
import { CartProvider } from './context/CartContext'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <CartProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CartProvider>
        </Provider>
    </StrictMode>,
)