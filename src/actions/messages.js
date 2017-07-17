import { createAction } from 'redux-actions'
import $ from "../jquery"
import { getProfileResultsById} from './profileFetch'

export const GET_MESSAGES_INIT = 'GET_MESSAGES_INIT'
export const GET_MESSAGES_DONE = 'GET_MESSAGES_DONE'

export const SEND_MESSAGE_INIT = 'SEND_MESSAGE_INIT'
export const SEND_MESSAGE_DONE = 'SEND_MESSAGE_DONE'


export const getMessagesInit = createAction("GET_MESSAGES_INIT")
export const getMessagesDone  = createAction("GET_MESSAGES_DONE")

export const sendMessageInit  = createAction("SEND_MESSAGE_INIT")
export const sendMessageDone  = createAction("SEND_MESSAGE_DONE")

export const access_token = "access_token"
import * as Cookie from "js-cookie"

export const getMessages = (to_user_id) => {
  return dispatch => {
    dispatch(getMessagesInit())
    console.log(Cookie.get(access_token))
    $.ajax({
    url:"http://localhost:8000/message/"+to_user_id,
    type:"GET",
    xhrFields: {
      withCredentials: true 
    },
    dataType:'json',
    success: function(result){
      dispatch(getMessagesDone(result.messages))
    }
    }) 
  }
}


export const sendMessage = (to_user_id,content) => {
  return (dispatch,getState) => {
    dispatch(sendMessageInit())
    $.ajax({
    url:"http://localhost:8000/message",
    type:"POST",
    data: { to_user_id: to_user_id, 'content': content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(sendMessageDone())
      dispatch(getMessages(to_user_id))
      // dispatch(getProfileResultsById(to_user_id))
    },
    }) 
  }
}


