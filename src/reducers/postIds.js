import {SAVE_POST_IDS} from '../actions/getCurrentUserData'

const initialState = {
  postIds:[]
}

const postIds = (state = initialState, action) => {
  switch(action.type){
    case SAVE_POST_IDS:
      return Object.assign({}, state, {
       postIds : action.payload
    })
	default:
	  return state
  }
}

export default postIds