import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './Login'
import Home from './pages/Home'
import Profile from './pages/components/Profile'
import logger from 'redux-logger'
import './App.scss'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'

import { postLogin } from './actions/login'
import validate from './reducers/login'

import { getSearchResults } from './actions/search'
import profileSearch from './reducers/search'

import { getProfileResults, getProfileResultsById } from './actions/profileFetch'
import profileFetch from './reducers/profileFetch'

import { addNewPost } from './actions/addPost'
import addPost from './reducers/addPost'

import { addNewComment } from './actions/addComment'
import addComment from './reducers/addComment'

import { getRequests } from './actions/fetchRequests'
import fetchRequests from './reducers/fetchRequests'

let reducers = {
	validate,
	profileSearch,
	profileFetch,
	addPost,
	addComment,
	fetchRequests
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

store.dispatch(getRequests())

