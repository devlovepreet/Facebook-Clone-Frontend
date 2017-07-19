import {LOGIN_INIT,LOGIN_DONE, LOGIN_ERROR, LOGOUT_INIT,LOGOUT_DONE, LOGOUT_ERROR} from '../actions/login.js'

const initialState = {
  validLogin:false,
  fetching:false,
  fetched:false,
  error:null
}

const validate = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return Object.assign({}, state, {
       fetching: true,
       fetched: false,
       validLogin:false,
       error:null
    })
    case LOGIN_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       validLogin: true,
       error:null
    })
    case LOGIN_ERROR:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       validLogin: false,
       error: action.payload,
    })
    case LOGOUT_INIT:
      return Object.assign({}, state, {
       fetching: true,
       fetched: false,
       validLogin:true,
       error:null
    })
    case LOGOUT_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       validLogin:false,
       error:null
    })
    case LOGOUT_ERROR:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       validLogin: false,
       error:action.payload
    })
    default:
      return state
  }
}

export default validate