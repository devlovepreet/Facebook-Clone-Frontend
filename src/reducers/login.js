import {LOGIN_INIT,LOGIN_DONE, LOGIN_ERROR} from '../actions/login.js'

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
       fetched: false
    })
    case LOGIN_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       validLogin: true,
    })
    case LOGIN_ERROR:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       validLogin: false,
       error: action.payload,
    })
    default:
      return state
  }
}

export default validate