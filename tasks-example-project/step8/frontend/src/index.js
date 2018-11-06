import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/LoginReducer';
import taskReducer from './reducers/taskReducer';

const rootReducer = combineReducers({
	login:loginReducer,
	tasks:taskReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
