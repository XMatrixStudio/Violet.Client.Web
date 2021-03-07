import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from '@/reportWebVitals';
import { Provider, teamsV2Theme } from '@fluentui/react-northstar'

ReactDOM.render(
  <React.StrictMode>
    <Provider theme={teamsV2Theme}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
