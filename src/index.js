import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MoviesContext from './context/MoviesContext';
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.render(
  
    <MoviesContext>
      <Provider store={store}>
      <App />
      </Provider>
      
    </MoviesContext>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
