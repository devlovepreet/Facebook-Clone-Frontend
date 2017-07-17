import { GET_MESSAGES_INIT, GET_MESSAGES_DONE, SEND_MESSAGE_INIT, SEND_MESSAGE_DONE } from '../actions/messages.js'

const initialState = {
  fetching:false,
  fetched:false,
  results:[],
  success:null,
  error:null
}

const messages = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
       results:[],
       success:null,
       error:null
    })
    case GET_MESSAGES_DONE:
      return Object.assign({}, state, {
       fetching:false,
       fetched:true,
       results: action.payload,
       success:null,
       error:null
    })
    case SEND_MESSAGE_INIT:
      return Object.assign({}, state, {
       fetching:true,
       fetched:false,
       results:[],
       success:null,
       error:null
    })
    case SEND_MESSAGE_DONE:
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

export default messages