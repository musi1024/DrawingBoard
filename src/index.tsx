import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'rpf/react/vconsole';
import preventScroll from 'rpf/un/preventScroll.js';

preventScroll();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
