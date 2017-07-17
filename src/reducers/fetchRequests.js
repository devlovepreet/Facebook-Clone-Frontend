import {REQUESTS_INIT,REQUESTS_DONE} from '../actions/fetchRequests.js'

const initialState = {
  fetching:false,
  results:[]
}

const fetchRequests = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTS_INIT:
      return Object.assign({}, state, {
       fetching: true,
    })
    case REQUESTS_DONE:
      return Object.assign({}, state, {
       fetching: false,
       results: action.payload
    })
    default:
      return state
  }
}

export default fetchRequests