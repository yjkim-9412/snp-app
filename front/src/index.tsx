import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App';
import "bootstrap/dist/css/bootstrap.css";
import './axios.config';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
);


