import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './Components/ClientNewestDashboard/Sidebar/Sidebar';

//REDUX

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/rootReducer';
import clientProjectsReducer from './Redux/Reducer/clientProjects';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(clientProjectsReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <div className='dashboard-container'>
      <Sidebar />
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </div>

  </Provider>


  , document.getElementById('root')
);

