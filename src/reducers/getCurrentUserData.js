import { GET_CURRENT_USER_INIT, GET_CURRENT_USER_DONE, GET_CURRENT_USER_ERROR} from '../actions/getCurrentUserData.js'

const initialState = {
  fetching:false,
  fetched:false,
  user:null,
  error : null
}

const getCurrentUserData = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_INIT:
      return Object.assign({}, state, {
       fetching: true,
    })
    case GET_CURRENT_USER_DONE:
      return Object.assign({}, state, {
       fetching: false,
       fetched: true,
       user: action.payload,
       error:null
    })
    case GET_CURRENT_USER_ERROR:
      return Object.assign({}, state, {
       fetching: false,
       fetched : true,
       user:null,
       error: action.payload
    })
    default:
      return state
  }
}

export default getCurrentUserData