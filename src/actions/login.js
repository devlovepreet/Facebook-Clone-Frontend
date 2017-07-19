export const LOGIN_INIT = 'LOGIN_INIT'
export const LOGIN_DONE = 'LOGIN_DONE'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const LOGOUT_INIT = 'LOGOUT_INIT'
export const LOGOUT_DONE = 'LOGOUT_DONE'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

import { validate } from "../reducers/login"
import { createAction } from 'redux-actions'
import $ from "../jquery"

export const loginInit = createAction("LOGIN_INIT")
export const loginDone  = createAction("LOGIN_DONE")
export const loginError = createAction("LOGIN_ERROR")

export const logoutInit = createAction("LOGOUT_INIT")
export const logoutDone  = createAction("LOGOUT_DONE")
export const logoutError = createAction("LOGOUT_ERROR")

export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const postLogin = (email, password) => {
  return dispatch => {
    dispatch(loginInit())

    $.ajax({
    url:"http://localhost:8000/login",
    type:"POST",
    data: { email: email, password: password},
    dataType:'json',
    success: function(result){
      Cookie.set(access_token ,result.access_token)
      dispatch(loginDone())
    },
    error: function (result) {
      let errorObject = JSON.parse(result.responseText)
      let error = errorObject.error ? errorObject.error : ( errorObject.email? errorObject.email : errorObject.password )
      dispatch(loginError(error))
    }
    }) 
  }
}

export const postLogout = () => {
  return dispatch => {
    dispatch(logoutInit())
    $.ajax({
    url:"http://localhost:8000/logout",
    type:"POST",
    dataType:'json',
     xhrFields: {
      withCredentials: true 
    },
    success: function(result){
      Cookie.remove(access_token)
      dispatch(logoutDone())
      window.location = '/login'
    },
    error: function (result) {
      let errorObject = JSON.parse(result.responseText)
      let error = errorObject.error ? errorObject.error : ( errorObject.email? errorObject.email : errorObject.password )
      dispatch(logoutError(error))
    }
    }) 
  }
}




