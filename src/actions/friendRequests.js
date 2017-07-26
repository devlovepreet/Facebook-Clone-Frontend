import { createAction } from 'redux-actions'
import{ getProfileResultsById} from './profileFetch'

export const GET_REQUESTS_INIT = 'GET_REQUESTS_INIT'
export const GET_REQUESTS_DONE = 'GET_REQUESTS_DONE'

export const CONFIRM_REQUEST_INIT = 'CONFIRM_REQUEST_INIT'
export const CONFIRM_REQUEST_DONE = 'CONFIRM_REQUEST_DONE'


export const DELETE_REQUEST_INIT = 'DELETE_REQUEST_INIT'
export const DELETE_REQUEST_DONE = 'DELETE_REQUEST_DONE'

export const SEND_REQUEST_INIT = 'SEND_REQUEST_INIT'
export const SEND_REQUEST_DONE = 'SEND_REQUEST_DONE'

export const getRequestsInit = createAction("GET_REQUESTS_INIT")
export const getRequestsDone  = createAction("GET_REQUESTS_DONE")

export const confirmRequestInit  = createAction("CONFIRM_REQUEST_INIT")
export const comfirmRequestDone  = createAction("CONFIRM_REQUEST_DONE")

export const deleteRequestInit  = createAction("DELETE_REQUEST_INIT")
export const deleteRequestDone  = createAction("DELETE_REQUEST_DONE")

export const sendRequestInit  = createAction("SEND_REQUEST_INIT")
export const sendRequestDone  = createAction("SEND_REQUEST_DONE")

export const getRequests = () => {
  return dispatch => {
    dispatch(getRequestsInit())
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

export const confirmRequest = (from_user_id) => {
  return dispatch => {
    dispatch(confirmRequestInit())
    $.ajax({
    url:"http://localhost:8000/request/confirm/"+from_user_id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(comfirmRequestDone())
      dispatch(getRequests())
      dispatch(getProfileResultsById(from_user_id))
    }
    }) 
  }
}

export const deleteRequest = (from_user_id) => {
  return dispatch => {
    dispatch(deleteRequestInit())
    $.ajax({
    url:"http://localhost:8000/request/reject/"+from_user_id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(deleteRequestDone())
      dispatch(getRequests())
    }
    }) 
  }
}

export const deleteRequestByUserId = (to_user_id) => {
  return dispatch => {
    dispatch(deleteRequestInit())
    $.ajax({
    url:"http://localhost:8000/request/cancel/"+to_user_id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(deleteRequestDone())
      dispatch(getRequests())
      dispatch(getProfileResultsById(to_user_id))
    }
    }) 
  }
}

export const sendRequest = (to_user_id) => {
  return (dispatch,getState) => {
    dispatch(sendRequestInit())
    $.ajax({
    url:"http://localhost:8000/request/" + to_user_id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(getProfileResultsById(to_user_id))
      dispatch(sendRequestDone())
    },
    }) 
  }
}


