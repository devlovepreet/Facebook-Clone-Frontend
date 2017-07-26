import { createAction } from 'redux-actions'

export const GET_CURRENT_USER_INIT = 'GET_CURRENT_USER_INIT'
export const GET_CURRENT_USER_DONE = 'GET_CURRENT_USER_DONE'
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR'
export const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER'
export const SAVE_POST_IDS = 'SAVE_POST_IDS'
export const SAVE_POSTS = 'SAVE_POSTS'

export const getCurrentUserInit = createAction("GET_CURRENT_USER_INIT")
export const getCurrentUserDone  = createAction("GET_CURRENT_USER_DONE")
export const getCurrentUserError  = createAction("GET_CURRENT_USER_ERROR")

export const saveCurrentUser = createAction("SAVE_CURRENT_USER")
export const savePostIds = createAction("SAVE_POST_IDS")
export const savePosts = createAction("SAVE_POSTS")

export const access_token_str = "access_token"
import * as Cookie from "js-cookie"

export const getCurrentUser = () => {
  return dispatch => {
    dispatch(getCurrentUserInit())
    $.ajax({
    url:"http://localhost:8000/user",
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      // console.log(result)
      dispatch(savePostIds(result.postIds))
      dispatch(savePosts(result.posts))
      dispatch(saveCurrentUser(result.user))
      dispatch(getCurrentUserDone(result.user))
    },
    error: function(result){
      Cookie.remove(access_token_str)
      window.location = '/login'
      dispatch(getCurrentUserError(result.responseText.error))
    }
    }) 
  }
}

