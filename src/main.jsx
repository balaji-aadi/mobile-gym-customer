import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/700.css";

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);