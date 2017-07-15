import {SEARCH_INIT,SEARCH_DONE} from '../actions/search.js'

const initialState = {
  fetching:false,
  results:[]
}

const profileSearch = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_INIT:
      return Object.assign({}, state, {
       fetching: true,
    })
    case SEARCH_DONE:
      return Object.assign({}, state, {
       fetching: false,
       results: action.payload
    })
    default:
      return state
  }
}

export default profileSearch