import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(

  <StrictMode>
    <App />
    <Toaster
    position='top-right'
    toastOptions={{
      duration:4000,
      style:{
        background:'#22c55e',
        color:'white',
        fontFamily:'"Courier New", monospace',
        fontWeight:'bold',
        marginTop:'5px',
        marginRight:'5px',
      },
      success:{
        icon:'★'
      },
      error:{
        icon:'✕'
      },
    }}
    />
  </StrictMode>,
)



