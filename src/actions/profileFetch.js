export const PROFILE_FETCH_INIT = 'PROFILE_FETCH_INIT'
export const PROFILE_FETCH_DONE = 'PROFILE_FETCH_DONE'
export const PROFILE_FETCH_ERROR = 'PROFILE_FETCH_ERROR'

import { profileFetch } from "../reducers/profileFetch"
import { createAction } from 'redux-actions'

export const profileFetchInit = createAction("PROFILE_FETCH_INIT")
export const profileFetchDone  = createAction("PROFILE_FETCH_DONE")
export const profileFetchError  = createAction("PROFILE_FETCH_ERROR")

import {getCurrentUser} from '../actions/currentUser'

export const getProfileResults = () => {
  return dispatch => {
    dispatch(profileFetchInit())
    $.ajax({
    url:"http://localhost:8000/user",
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      // console.log(result)
      dispatch(profileFetchDone(result.user))
    },
    error: function(result){
      // console.log(result)
      dispatch(profileFetchError(result.responseText.error))
    }
    }) 
  }
}


export const getProfileResultsById = (id) => {
  return (dispatch, getState) => {
    let state = getState()
    let user = state.currentUser.user.id
    // console.log(state.currentUser.user.id)
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
      console.log(result)
      dispatch(profileFetchDone(result.user))
    },
    error: function(result){
      console.log(result)
      dispatch(profileFetchError(result.responseText.error))
    }
    }) 
  }
}