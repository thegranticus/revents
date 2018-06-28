import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root'); 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
