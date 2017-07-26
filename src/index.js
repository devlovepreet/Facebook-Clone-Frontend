import React from 'react'
import ReactDOM from 'react-dom'
import logger from 'redux-logger'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute, Redirect } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Profile from './pages/components/Profile'
import './assets/scss/App.scss'
import './assets/scss/Login.scss'
import './assets/scss/Home.scss'
import validate from './reducers/login'
import profileSearch from './reducers/search'
import profileFetch from './reducers/profileFetch'
import postOperations from './reducers/postOperations'
import commentOperations from './reducers/commentOperations'
import friendRequests from './reducers/friendRequests'
import getCurrentUserData from './reducers/getCurrentUserData'
import messages from './reducers/messages'
import currentUser from './reducers/currentUser'
import posts from './reducers/posts'
import postIds from './reducers/postIds'

let reducers = {
	validate,
	profileSearch,
	profileFetch,
	postOperations,
	commentOperations,
	friendRequests,
	getCurrentUserData,
	messages,
	currentUser,
	posts,
	postIds
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

