import { SAVE_CURRENT_USER} from '../actions/getCurrentUserData.js'

const initialState = {
  user:{},
}

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_CURRENT_USER:
      return Object.assign({}, state, {
       user: action.payload,
    })
    default:
      return state
  }
}

export default currentUser