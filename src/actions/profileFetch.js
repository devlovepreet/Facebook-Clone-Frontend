import { profileFetch } from "../reducers/profileFetch"
import { createAction } from 'redux-actions'

export const PROFILE_FETCH_INIT = 'PROFILE_FETCH_INIT'
export const PROFILE_FETCH_DONE = 'PROFILE_FETCH_DONE'
export const PROFILE_FETCH_ERROR = 'PROFILE_FETCH_ERROR'
export const SAVE_OTHER_USER = 'SAVE_OTHER_USER'

export const profileFetchInit = createAction("PROFILE_FETCH_INIT")
export const profileFetchDone  = createAction("PROFILE_FETCH_DONE")
export const profileFetchError  = createAction("PROFILE_FETCH_ERROR")
export const saveOtherUser = createAction("SAVE_OTHER_USER")

import {savePosts, savePostIds, getCurrentUser} from './getCurrentUserData'

// export const getProfileResults = () => {
//   return dispatch => {
//     dispatch(profileFetchInit())
//     $.ajax({
//     url:"http://localhost:8000/user",
//     type:"GET",
//     xhrFields: {
//       withCredentials: true
//     },
//     dataType:'json',
//     success: function(result){
//       // console.log(result)
//       dispatch(profileFetchDone(result.user))
//     },
//     error: function(result){
//       // console.log(result)
//       dispatch(profileFetchError(result.responseText.error))
//     }
//     }) 
//   }
// }


export const getProfileResultsById = (id) => {
  return (dispatch, getState) => {
    let state = getState()
    let user = state.currentUser.user.id
    let fetching = state.profileFetch.fetching
    if(fetching) {
      return
    }
    // console.log(state.currentUser.user.id)
    if(id === user) {
      console.log("Current User fetched in getProfileResultsById")
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
      console.log(result)
      dispatch(savePosts(result.posts))
      dispatch(savePostIds(result.postIds))
      dispatch(saveOtherUser(result.user))
      dispatch(profileFetchDone(result.user))
    },
    error: function(result){
      console.log(result)
      dispatch(profileFetchError(result.responseText.error))
    }
    }) 
  }
}