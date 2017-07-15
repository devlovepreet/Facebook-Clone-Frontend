export const SEARCH_INIT = 'SEARCH_INIT'
export const SEARCH_DONE = 'SEARCH_DONE'
import { profileSearch } from "../reducers/search"
import { createAction } from 'redux-actions'
import $ from "../jquery"

export const searchInit = createAction("SEARCH_INIT")
export const searchDone  = createAction("SEARCH_DONE")

export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const getSearchResults = (name) => {
  return dispatch => {
    if(!name.length) {
      dispatch(searchDone([]))
      return
    }
    dispatch(searchInit())
    console.log(Cookie.get(access_token))
    $.ajax({
    url:"http://localhost:8000/search/" + name,
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    // beforeSend: function(xhr){xhr.setRequestHeader('access_token', Cookie.get(access_token));},
    dataType:'json',
    success: function(result){
      console.log(result)
      dispatch(searchDone(result.users))
    }
    }) 
  }
}