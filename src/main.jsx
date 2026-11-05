import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

// Use hash URLs only when the site is served from a static host without
// rewrite rules (set VITE_HASH_ROUTER=true at build time).
const Router = import.meta.env.VITE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

// When built with VITE_BASE=/trident/ the site opens both at /trident (through
// evertechme.com) and at the root of the Vercel address, so match on the URL.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const basename = base.startsWith('/') && window.location.pathname.startsWith(base) ? base : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </React.StrictMode>
);
