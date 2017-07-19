import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'

import Login from './Login'
import Home from './pages/Home'
import Profile from './pages/components/Profile'
import './App.scss'

import validate from './reducers/login'
import profileSearch from './reducers/search'
import profileFetch from './reducers/profileFetch'
import posts from './reducers/posts'
import comments from './reducers/comments'
import friendRequests from './reducers/friendRequests'
import currentUser from './reducers/currentUser'
import messages from './reducers/messages'

let reducers = {
	validate,
	profileSearch,
	profileFetch,
	posts,
	comments,
	friendRequests,
	currentUser,
	messages
}

reducers = combineReducers(reducers)

const store = createStore(
  reducers,
  applyMiddleware(thunk, logger)
);

ReactDOM.render(
	<Provider store={store}>
	  <Router history={browserHistory}>
	    <Route path="/">
	      <IndexRoute component={Login}/>
	      <Route path="/login" component={Login}/>
	      <Route path="/user" component={Home}>
	      	<IndexRoute component={Profile}/>
	      	<Route path="/user/:user_id" component={Profile}/>
	      </Route>
	    </Route>
	  </Router>
	</Provider>,
	document.getElementById('root')
)

// store.dispatch(sendMessage(1,"This is message through code from Lovepreet to chetan"))

