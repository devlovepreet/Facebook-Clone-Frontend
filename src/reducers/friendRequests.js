import { GET_REQUESTS_INIT, GET_REQUESTS_DONE, CONFIRM_REQUEST_INIT, CONFIRM_REQUEST_DONE, DELETE_REQUEST_INIT, DELETE_REQUEST_DONE, SEND_REQUEST_INIT, SEND_REQUEST_DONE } from '../actions/friendRequests.js'

const initialState = {
  fetching:false,
  fetched:false,
  results:[],
  success:null,
  error:null
}

const friendRequests = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
       results:[],
       success:null,
       error:null
    })
    case GET_REQUESTS_DONE:
      return Object.assign({}, state, {
       fetching:false,
       fetched:true,
       results: action.payload,
       success:null,
       error:null
    })
    case CONFIRM_REQUEST_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
       results:[],
       success:null,
       error:null
    })
    case CONFIRM_REQUEST_DONE:
      return Object.assign({}, state, {
       fetching:false,
       fetched:true,
       results:[],
       success:action.payload,
       error:null
    })
    case DELETE_REQUEST_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
       results:[],
       success:null,
       error:null
    })
    case DELETE_REQUEST_DONE:
      return Object.assign({}, state, {
       fetching:false,
       fetched:true,
       results:[],
       success:action.payload,
       error:null
    })
    case SEND_REQUEST_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
       results:[],
       success:null,
       error:null
    })
    case SEND_REQUEST_DONE:
      return Object.assign({}, state, {
       fetching:false,
       fetched:true,
       results:[],
       success:action.payload,
       error:null
    })
  
    default:
      return state
  }
}

export default friendRequests