export const CURRENT_USER_INIT = 'CURRENT_USER_INIT'
export const CURRENT_USER_DONE = 'CURRENT_USER_DONE'
export const CURRENT_USER_ERROR = 'CURRENT_USER_ERROR'

import { currentUser } from "../reducers/currentUser"
import { createAction } from 'redux-actions'

export const currentUserInit = createAction("CURRENT_USER_INIT")
export const currentUserDone  = createAction("CURRENT_USER_DONE")
export const currentUserError  = createAction("CURRENT_USER_ERROR")

import access_token from '../helpers/constants'
import * as Cookie from "js-cookie"

export const getCurrentUser = () => {
  return dispatch => {
    dispatch(currentUserInit())
    $.ajax({
    url:"http://localhost:8000/user",
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(currentUserDone(result.user))
    },
    error: function(result){
      window.location = '/login'
      Cookie.remove(access_token)
      dispatch(currentUserError(result.responseText.error))
    }
    }) 
  }
}
