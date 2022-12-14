import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AboutBlock from './components/layout/footer/AboutBlock';
import Layout from './components/layout/Layout';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <Layout>
      <App />
      <AboutBlock />
    </Layout>
  </BrowserRouter>,
);
