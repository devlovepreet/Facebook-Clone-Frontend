export const REQUESTS_INIT = 'REQUESTS_INIT'
export const REQUESTS_DONE = 'REQUESTS_DONE'
import { fetchRequests } from "../reducers/fetchRequests"
import { createAction } from 'redux-actions'
import $ from "../jquery"

export const requestsInit = createAction("REQUESTS_INIT")
export const requestsDone  = createAction("REQUESTS_DONE")

export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const getRequests = () => {
  return dispatch => {
    dispatch(requestsInit())
    console.log(Cookie.get(access_token))
    $.ajax({
    url:"http://localhost:8000/request",
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(requestsDone(result.requests))
    }
    }) 
  }
}