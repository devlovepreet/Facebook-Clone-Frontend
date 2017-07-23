export const ADD_POST_INIT = 'ADD_POST_INIT'
export const ADD_POST_DONE = 'ADD_POST_DONE'

export const DELETE_POST_INIT = 'DELETE_POST_INIT'
export const DELETE_POST_DONE = 'DELETE_POST_DONE'

export const UPDATE_POST_INIT = 'UPDATE_POST_INIT'
export const UPDATE_POST_DONE = 'UPDATE_POST_DONE'

import { posts } from "../reducers/posts"
import { createAction } from 'redux-actions'
import { getProfileResultsById } from './profileFetch'

export const addPostInit = createAction("ADD_POST_INIT")
export const addPostDone  = createAction("ADD_POST_DONE")

export const deletePostInit = createAction("DELETE_POST_INIT")
export const deletePostDone = createAction("DELETE_POST_DONE")

export const updatePostInit = createAction("UPDATE_POST_INIT")
export const updatePostDone = createAction("UPDATE_POST_DONE")

import access_token from '../helpers/constants'
import * as Cookie from "js-cookie"

export const addNewPost = (content) => {
  return (dispatch,getState) => {
    let state = getState()
    let id = state.currentUser.user.id
    dispatch(addPostInit())
    $.ajax({
    url:"http://localhost:8000/post",
    type:"POST",
    data: { content: content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(addPostDone())
      dispatch(getProfileResultsById(id))
    }
    }) 
  }
}

export const deletePost = (post_id) => {
  return (dispatch,getState) => {
    let state = getState()
    let id = state.currentUser.user.id
    dispatch(deletePostInit())
    $.ajax({
    url:"http://localhost:8000/post/delete/"+post_id,
    type:"POST",
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(deletePostDone())
      dispatch(getProfileResultsById(id))
    }
    }) 
  }
}

export const updatePost = (post_id,content) => {
  return (dispatch,getState) => {
    let state = getState()
    let id = state.currentUser.user.id
    dispatch(updatePostInit())
    $.ajax({
    url:"http://localhost:8000/post/update/"+post_id,
    type:"POST",
    data: { content: content},
    xhrFields: {
      withCredentials: true
    },
    dataType:'json',
    success: function(result){
      dispatch(updatePostDone())
      dispatch(getProfileResultsById(id))
    }
    }) 
  }
}

