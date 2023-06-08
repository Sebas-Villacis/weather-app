import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.tsx';
import './index.css';
import Weather from './pages/Weather.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route index element={<App />} />
        <Route path="weather" element={<Weather />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
