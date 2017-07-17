import {CURRENT_USER_INIT, CURRENT_USER_DONE, CURRENT_USER_ERROR} from '../actions/currentUser.js'

const initialState = {
  fetching:false,
  fetched:false,
  user:null,
  error : null
}

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_INIT:
      return Object.assign({}, state, {
       fetching: true,
    })
    case CURRENT_USER_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       user: action.payload,
       error:null
    })
    case CURRENT_USER_ERROR:
      return Object.assign({}, state, {
       fetching: false,
       fetched : true,
       user:null,
       error: action.payload
    })
    default:
      return state
  }
}

export default currentUser