import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import AboutBlock from './components/layout/footer/AboutBlock';
import Layout from './components/layout/Layout';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <HashRouter>
    <Layout>
      <App />
      <AboutBlock />
    </Layout>
  </HashRouter>,
);
