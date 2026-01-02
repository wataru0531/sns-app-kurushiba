

// main.js

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import "./style.css";
import App from './App.jsx'
import { SessionProvider, SessionContext } from './sessionProvider.jsx';

// supabaseのパスワード
// xEQ9BoAFNOksFoUW

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionProvider>
  </StrictMode>,
)
