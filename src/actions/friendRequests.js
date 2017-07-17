import { fetchRequests } from "../reducers/fetchRequests"
import { createAction } from 'redux-actions'
import $ from "../jquery"

export const GET_REQUESTS_INIT = 'GET_REQUESTS_INIT'
export const GET_REQUESTS_DONE = 'GET_REQUESTS_DONE'

export const CONFIRM_REQUEST_INIT = 'CONFIRM_REQUEST_INIT'
export const CONFIRM_REQUEST_DONE = 'CONFIRM_REQUEST_DONE'

export const DECLINE_REQUEST_INIT = 'DECLINE_REQUEST_INIT'
export const DECLINE_REQUEST_DONE = 'DECLINE_REQUEST_DONE'

export const DELETE_REQUEST_INIT = 'DELETE_REQUEST_INIT'
export const DELETE_REQUEST_DONE = 'DELETE_REQUEST_DONE'

export const SNED_REQUEST_INIT = 'SEND_REQUEST_INIT'
export const SEND_REQUEST_DONE = 'SEND_REQUEST_DONE'


export const getRequestsInit = createAction("GET_REQUESTS_INIT")
export const getRequestsDone  = createAction("GET_REQUESTS_DONE")

export const confirmRequestInit  = createAction("CONFIRM_REQUEST_INIT")
export const comfirmRequestDone  = createAction("CONFIRM_REQUEST_DONE")

export const declineRequestInit  = createAction("DECLINE_REQUEST_INIT")
export const declineRequestDone  = createAction("DECLINE_REQUEST_DONE")

export const deleteRequestInit  = createAction("DELETE_REQUEST_INIT")
export const deleteRequestDone  = createAction("DELETE_REQUEST_DONE")

export const sendRequestInit  = createAction("SEND_REQUEST_INIT")
export const sendRequestDone  = createAction("SEND_REQUEST_DONE")

export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const getRequests = () => {
  return dispatch => {
    dispatch(getRequestsInit())
    console.log(Cookie.get(access_token))
    $.ajax({
    url:"http://localhost:8000/request",
    type:"GET",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(getRequestsDone(result.requests))
    }
    }) 
  }
}

export const confirmRequest = (id) => {
  return dispatch => {
    dispatch(confirmRequestInit())
    $.ajax({
    url:"http://localhost:8000/request",
    type:"PUT",
    data: { id: id},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(comfirmRequestDone())
    }
    }) 
  }
}

export const deleteRequest = (id) => {
  return dispatch => {
    dispatch(deleteRequestInit())
    $.ajax({
    url:"http://localhost:8000/request",
    type:"DELETE",
    data: { id: id},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(deleteRequestDone())
    }
    }) 
  }
}

export const declineRequest = (id) => {
  return dispatch => {
    dispatch(declineRequestInit())
    $.ajax({
    url:"http://localhost:8000/request/" + id,
    type:"PUT",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(declineRequestDone())
    }
    }) 
  }
}

export const sendRequest = (id) => {
  return dispatch => {
    dispatch(sendRequestInit())
    $.ajax({
    url:"http://localhost:8000/request",
    type:"POST",
    data: { id: id},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(sendRequestDone())
    }
    }) 
  }
}


