import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ImageSlotProvider } from './components/ImageSlotContext';
import './styles/tokens.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ImageSlotProvider>
        <App />
      </ImageSlotProvider>
    </BrowserRouter>
  </React.StrictMode>
);
