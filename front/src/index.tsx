import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './i18n';
import { getRoutingBase } from './env';

const root: Root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter basename={getRoutingBase()}>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
