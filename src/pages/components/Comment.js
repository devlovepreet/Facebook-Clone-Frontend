import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'

class Comment extends Component {
	constructor(props){
		super(props)
	}

  componentWillMount(){

  }

  render() {

    return (
      <div className="comment-heading">
        <div className="comment-image-container">
          <div className="comment-image"><p>LS</p></div>
        </div>
        <div className="comment-content">
          <Link to={"/user/"+"1"} className="comment-username">Name</Link>
          <div className="comment">Content</div>
          <ul className="ul-comment-like-share">
            <li><a href='javascript:void(0);'>Like</a></li>
            <li><a href='javascript:void(0);'>Reply</a></li>
            <li>Updated_at</li>
          </ul>
        </div>
        <div className="edit-comment-caret pull-right">
          <div className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul className="dropdown-menu pull-right dropdown-menu-comment">
              <li><a data-toggle="modal" data-target={"#comment-modal-"+"1"}>Edit</a></li>
              <li><a data-id="comment id" onClick="">Delete</a></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;