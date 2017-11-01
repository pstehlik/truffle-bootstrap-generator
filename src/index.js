import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { Web3Provider } from 'react-web3';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    
        <App />
    ,
    document.getElementById('root')
);
registerServiceWorker();