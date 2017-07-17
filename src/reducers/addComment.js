import {ADD_COMMENT_INIT, ADD_COMMENT_DONE, ADD_COMMENT_ERROR} from '../actions/addComment.js'

const initialState = {
  commenting:false,
  commented:false,
  error :null
}

const addComment = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_INIT:
      return Object.assign({}, state, {
       commenting: true,
    })
    case ADD_COMMENT_DONE:
      return Object.assign({}, state, {
       commenting: false,
       commented: true,
       error:null
    })
    case ADD_COMMENT_ERROR:
      return Object.assign({}, state, {
       commenting: false,
       commented : true,
       error: action.payload
    })
    default:
      return state
  }
}

export default addComment