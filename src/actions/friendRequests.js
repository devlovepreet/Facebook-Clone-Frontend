import { createAction } from 'redux-actions'
import $ from "../jquery"
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
    url:"http://localhost:8000/request/"+id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(comfirmRequestDone())
      dispatch(getRequests())
    }
    }) 
  }
}

export const deleteRequest = (id) => {
  return dispatch => {
    dispatch(deleteRequestInit())
    $.ajax({
    url:"http://localhost:8000/request/delete/"+id,
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

// export const sendRequest = (to_user_id) => {
//   return dispatch => {
//     dispatch(sendRequestInit())
//     $.ajax({
//     url:"http://localhost:8000/request",
//     type:"POST",
//     data: { to_user_id: to_user_id},
//     xhrFields: {
//       withCredentials: true
//     },
//     dataType:'json',
//     success: function(result){
//       dispatch(sendRequestDone())

//     }
//     }) 
//   }
// }

export const sendRequest = (to_user_id) => {
  return (dispatch,getState) => {
    dispatch(sendRequestInit())
    $.ajax({
    url:"http://localhost:8000/request",
    type:"POST",
    data: { to_user_id: to_user_id},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(sendRequestDone())
      dispatch(getProfileResultsById(to_user_id))
    },
    }) 
  }
}


