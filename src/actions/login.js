export const LOGIN_INIT = 'LOGIN_INIT'
export const LOGIN_DONE = 'LOGIN_DONE'
export const LOGIN_ERROR = 'LOGIN_ERROR'
import { validate } from "../reducers/login"
import { createAction } from 'redux-actions'
import $ from "../jquery"

export const loginInit = createAction("LOGIN_INIT")
export const loginError = createAction("LOGIN_ERROR")
export const loginDone  = createAction("LOGIN_DONE")
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
      // console.log(result)
      Cookie.set(access_token ,result.access_token)
      // console.log(Cookie.get(access_token))
      dispatch(loginDone())
    },
    error: function (result) {
      let errorObject = JSON.parse(result.responseText)
      let error = errorObject.error ? errorObject.error : ( errorObject.email? errorObject.email : errorObject.password )
      // console.log(error)
      dispatch(loginError(error))
    }
    }) 
  }
}




