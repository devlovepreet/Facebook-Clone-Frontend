import { ADD_COMMENT_INIT, ADD_COMMENT_DONE, UPDATE_COMMENT_INIT, UPDATE_COMMENT_DONE, DELETE_COMMENT_INIT, DELETE_COMMENT_DONE } from '../actions/commentOperations.js'

const initialState = {
  fetching:false,
  fetched:false,
  success: null,
  error :null
}

const commentOperations = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_INIT:
      return Object.assign({}, state, {
       fetching: true,
       fetched:false,
    })
    case ADD_COMMENT_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
    })
    case UPDATE_COMMENT_INIT:
      return Object.assign({}, state, {
       fetching: true,
       fetched:false,
    })
    case UPDATE_COMMENT_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
    })
    case DELETE_COMMENT_INIT:
      return Object.assign({}, state, {
       fetching: true,
       fetched:false,
    })
    case DELETE_COMMENT_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
    })
    default:
      return state
  }
}

export default commentOperations