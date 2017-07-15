export const ADD_POST_INIT = 'ADD_POST_INIT'
export const ADD_POST_DONE = 'ADD_POST_DONE'
export const ADD_POST_ERROR = 'ADD_POST_ERROR'
import { addPost } from "../reducers/addPost"
import { createAction } from 'redux-actions'
import { getProfileResults } from './profileFetch'
import $ from "../jquery"

export const addPostInit = createAction("ADD_POST_INIT")
export const addPostError = createAction("ADD_POST_ERROR")
export const addPostDone  = createAction("ADD_POST_DONE")
export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const addNewPost = (content) => {
  return dispatch => {
    dispatch(addPostInit())
    $.ajax({
    url:"http://localhost:8000/post",
    type:"POST",
    data: { content: content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(addPostDone())
      dispatch(getProfileResults())
    },
    error: function (result) {
      dispatch(addPostError(result.responseText))
    }
    }) 
  }
}


