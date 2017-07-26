import { createAction } from 'redux-actions'
import { getProfileResultsById } from './profileFetch'

export const ADD_COMMENT_INIT = 'ADD_COMMENT_INIT'
export const ADD_COMMENT_DONE = 'ADD_COMMENT_DONE'

export const UPDATE_COMMENT_INIT = 'UPDATE_COMMENT_INIT'
export const UPDATE_COMMENT_DONE = 'UPDATE_COMMENT_DONE'

export const DELETE_COMMENT_INIT = 'DELETE_COMMENT_INIT'
export const DELETE_COMMENT_DONE = 'DELETE_COMMENT_DONE'

export const addCommentInit = createAction("ADD_COMMENT_INIT")
export const addCommentDone  = createAction("ADD_COMMENT_DONE")

export const updateCommentInit = createAction("UPDATE_COMMENT_INIT")
export const updateCommentDone  = createAction("UPDATE_COMMENT_DONE")

export const deleteCommentInit = createAction("DELETE_COMMENT_INIT")
export const deleteCommentDone  = createAction("DELETE_COMMENT_DONE")

export const addNewComment = (post_id,content,update_id) => {
  return (dispatch,getState) => {
    // let state = getState()
    // let id = state.currentUser.user.id
    dispatch(addCommentInit())
    $.ajax({
    url:"http://localhost:8000/"+ post_id +"/comment",
    type:"POST",
    data: { content: content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(addCommentDone())
      dispatch(getProfileResultsById(update_id))
    }
    }) 
  }
}

export const updateComment = (comment_id, content, update_id) => {
  return (dispatch,getState) => {
    // let state = getState()
    // let id = state.currentUser.user.id
    dispatch(updateCommentInit())
    $.ajax({
    url:"http://localhost:8000/comment/update/"+comment_id,
    type:"POST",
    data: { content: content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(updateCommentDone())
      dispatch(getProfileResultsById(update_id))
    }
    }) 
  }
}

export const deleteComment = (comment_id, update_id) => {
  return (dispatch,getState) => {
    // let state = getState()
    // let id = state.currentUser.user.id
    dispatch(deleteCommentInit())
    $.ajax({
    url:"http://localhost:8000/comment/delete/"+comment_id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(deleteCommentDone())
      dispatch(getProfileResultsById(update_id))
    }
    }) 
  }
}



