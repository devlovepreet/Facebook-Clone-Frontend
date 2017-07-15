import {ADD_COMMENT_INIT, ADD_COMMENT_DONE, ADD_COMMENT_ERROR} from '../actions/addComment.js'

const initialState = {
  posting:false,
  posted:false,
  error :null
}

const addComment = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_INIT:
      return Object.assign({}, state, {
       posting: true,
    })
    case ADD_COMMENT_DONE:
      return Object.assign({}, state, {
       posting: false,
       posted: true,
       error:null
    })
    case ADD_COMMENT_ERROR:
      return Object.assign({}, state, {
       posting: false,
       posted : true,
       error: action.payload
    })
    default:
      return state
  }
}

export default addComment