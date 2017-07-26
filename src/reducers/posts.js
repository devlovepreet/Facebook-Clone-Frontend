import {SAVE_POSTS} from '../actions/getCurrentUserData'

const initialState = {
  posts:[]
}

const posts = (state = initialState, action) => {
  switch(action.type){
    case SAVE_POSTS:
      return Object.assign({}, state, {
       posts : action.payload
    })
    default:
	  return state
  }
}

export default posts