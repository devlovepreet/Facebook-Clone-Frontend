import { SAVE_OTHER_USER} from '../actions/profileFetch.js'

const initialState = {
  user:{},
}

const otherUser = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_OTHER_USER:
      return Object.assign({}, state, {
       user: action.payload,
    })
    default:
      return state
  }
}

export default otherUser