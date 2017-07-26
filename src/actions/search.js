import { profileSearch } from "../reducers/search"
import { createAction } from 'redux-actions'

export const SEARCH_INIT = 'SEARCH_INIT'
export const SEARCH_DONE = 'SEARCH_DONE'

export const searchInit = createAction("SEARCH_INIT")
export const searchDone  = createAction("SEARCH_DONE")

export const getSearchResults = (name) => {
  return dispatch => {
    if(!name.length) {
      dispatch(searchDone([]))
      return
    }
    dispatch(searchInit())
    $.ajax({
    url:"http://localhost:8000/search/" + name,
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(searchDone(result.users))
    }
    }) 
  }
}