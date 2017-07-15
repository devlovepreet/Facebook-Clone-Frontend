export const ADD_COMMENT_INIT = 'ADD_COMMENT_INIT'
export const ADD_COMMENT_DONE = 'ADD_COMMENT_DONE'
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR'
import { addComment } from "../reducers/addComment"
import { createAction } from 'redux-actions'
import { getProfileResults } from './profileFetch'
import $ from "../jquery"

export const addCommentInit = createAction("ADD_COMMENT_INIT")
export const addCommentError = createAction("ADD_COMMENT_ERROR")
export const addCommentDone  = createAction("ADD_COMMENT_DONE")
export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const addNewComment = (post_id,content) => {
  return dispatch => {
    dispatch(addCommentInit())
    $.ajax({
    url:"http://localhost:8000/comment",
    type:"POST",
    data: { 'post_id': post_id,content: content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(addCommentDone())
      dispatch(getProfileResults())
    },
    error: function (result) {
      dispatch(addCommentError(result.responseText))
    }
    }) 
  }
}

