import { ADD_POST_INIT, ADD_POST_DONE, DELETE_POST_INIT, DELETE_POST_DONE,UPDATE_POST_INIT, UPDATE_POST_DONE } from '../actions/posts.js'

const initialState = {
  fetching:false,
  fetched:false,
  success:null,
  error :null
}

const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
    })
    case ADD_POST_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
    })
    case DELETE_POST_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
    })
    case DELETE_POST_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
    })
    case UPDATE_POST_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
    })
    case UPDATE_POST_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
    })
    default:
      return state
  }
}

export default posts