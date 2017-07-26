import { profileFetch } from "../reducers/profileFetch"
import { createAction } from 'redux-actions'

export const PROFILE_FETCH_INIT = 'PROFILE_FETCH_INIT'
export const PROFILE_FETCH_DONE = 'PROFILE_FETCH_DONE'
export const PROFILE_FETCH_ERROR = 'PROFILE_FETCH_ERROR'
export const SAVE_OTHER_USER = 'SAVE_OTHER_USER'
export const SAVE_OTHER_USER_POSTS = 'SAVE_OTHER_USER_POSTS'
export const SAVE_OTHER_USER_POSTS_IDS = 'SAVE_OTHER_USER_POSTS_IDS'

export const profileFetchInit = createAction("PROFILE_FETCH_INIT")
export const profileFetchDone  = createAction("PROFILE_FETCH_DONE")
export const profileFetchError  = createAction("PROFILE_FETCH_ERROR")
export const saveOtherUser = createAction("SAVE_OTHER_USER")
export const saveOtherUserPosts = createAction("SAVE_OTHER_USER_POSTS")
export const saveOtherUserPostsIds = createAction("SAVE_OTHER_USER_POSTS_IDS")

import {getCurrentUser} from './getCurrentUserData'

export const getProfileResultsById = (id) => {
  return (dispatch, getState) => {
    let state = getState()
    let user = state.currentUser.user.id
    let fetching = state.profileFetch.fetching
    if(fetching) {
      return
    }
    if(id === user) {
      dispatch(getCurrentUser())
      return
    }
    dispatch(profileFetchInit())
    $.ajax({
    url:"http://localhost:8000/user/"+id,
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(saveOtherUserPosts(result.posts))
      dispatch(saveOtherUserPostsIds(result.postIds))
      dispatch(saveOtherUser(result.user))
      dispatch(profileFetchDone(result.user))
    },
    error: function(result){
      dispatch(profileFetchError(result.responseText.error))
    }
    }) 
  }
}