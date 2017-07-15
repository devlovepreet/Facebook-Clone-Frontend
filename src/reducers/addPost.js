import {ADD_POST_INIT, ADD_POST_DONE, ADD_POST_ERROR} from '../actions/addPost.js'

const initialState = {
  posting:false,
  posted:false,
  error :null
}

const addPost = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_INIT:
      return Object.assign({}, state, {
       posting: true,
    })
    case ADD_POST_DONE:
      return Object.assign({}, state, {
       posting: false,
       posted: true,
       error:null
    })
    case ADD_POST_ERROR:
      return Object.assign({}, state, {
       posting: false,
       posted : true,
       error: action.payload
    })
    default:
      return state
  }
}

export default addPost