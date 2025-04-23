import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/colors.css';
import './assets/styles/global.css';
import './assets/styles/@media.css';
import App from './App.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer />
    <App />
  </StrictMode>,
);
