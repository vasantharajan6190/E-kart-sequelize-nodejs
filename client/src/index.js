import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Login} from "./Contextapi"
ReactDOM.render(
  <React.StrictMode>
  <Login>
    <App />
    </Login>
  </React.StrictMode>,
  document.getElementById('root')
);