import {PROFILE_FETCH_INIT, PROFILE_FETCH_DONE, PROFILE_FETCH_ERROR} from '../actions/profileFetch.js'

const initialState = {
  fetching:false,
  fetched:false,
  user:null,
  error : null
}

const profileFetch = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_FETCH_INIT:
      return Object.assign({}, state, {
       fetching: true,
    })
    case PROFILE_FETCH_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       user: action.payload,
       error:null
    })
    case PROFILE_FETCH_ERROR:
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

export default profileFetch