import { SAVE_CURRENT_USER} from '../actions/getCurrentUserData.js'

const initialState = {
  user:{},
  posts:[]
}

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_USER:
      return Object.assign({}, state, {
       user: action.payload,
    })
	  case SAVE_POSTS:
	  return Object.assign({}, state, {
	   posts : action.payload
    })
    default:
      return state
  }
}

export default currentUser