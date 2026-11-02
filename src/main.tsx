import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-500.css';
import '@fontsource/dm-sans/latin-700.css';
import '@fontsource/caveat/latin-600.css';
import './styles.css';
import App from './App';
import { LocaleProvider } from './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </HashRouter>
  </StrictMode>,
);
