import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './app/index.css'
import App from './app/App.jsx'
import store from './app/app.store.js'
import LocomotiveScroll from 'locomotive-scroll';
import { ThemeProvider } from 'next-themes'

const locomotiveScroll = new LocomotiveScroll();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
