import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { App } from './App';

const $idRoot = document.getElementById('app');
const root = createRoot($idRoot);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);
