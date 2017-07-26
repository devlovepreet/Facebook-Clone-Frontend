import { SAVE_CURRENT_USER, SAVE_POSTS, SAVE_POST_IDS} from '../actions/getCurrentUserData.js'

const initialState = {
  user:{},
  posts:[],
  postIds:[]
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
	case SAVE_POST_IDS:
      return Object.assign({}, state, {
       postIds : action.payload
    })
    default:
      return state
  }
}

export default currentUser