import { SAVE_OTHER_USER, SAVE_OTHER_USER_POSTS, SAVE_OTHER_USER_POSTS_IDS} from '../actions/profileFetch.js'

const initialState = {
  user:{},
  posts:[],
  postIds:[]
}

const otherUser = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OTHER_USER:
      return Object.assign({}, state, {
       user: action.payload,
    })
    case SAVE_OTHER_USER_POSTS:
      return Object.assign({}, state, {
       posts: action.payload,
    })
    case SAVE_OTHER_USER_POSTS_IDS:
      return Object.assign({}, state, {
       postIds: action.payload,
    })

    default:
      return state
  }
}

export default otherUser