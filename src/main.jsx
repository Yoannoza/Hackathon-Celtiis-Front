import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css'
import App from './App.jsx'
import rootReducer from './utils/reducers'; // Importez votre reducer combiné ou principal

const store = configureStore({ reducer: rootReducer });

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
