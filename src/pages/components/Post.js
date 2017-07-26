import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { addNewComment, updateComment, deleteComment } from '../../actions/commentOperations'
import { updatePost, deletePost } from '../../actions/postOperations'
import { getInitials } from '../../helpers/Services'

class Post extends Component {
	constructor(props) {
    super(props)
    this.state = {text: '', updatePostContent:this.props.content}
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleCommentContentChange = this.handleCommentContentChange.bind(this)
    this.handleUpdatePostContentChange = this.handleUpdatePostContentChange.bind(this)
    this.handleUpdatePostSubmit = this.handleUpdatePostSubmit.bind(this)
    this.handleDeletePostSubmit = this.handleDeletePostSubmit.bind(this)
    this.handleUpdateCommentSubmit = this.handleUpdateCommentSubmit.bind(this)
    this.handleDeleteCommentSubmit = this.handleDeleteCommentSubmit.bind(this)
  }

  componentDidUpdate() {
  	console.log("Post ",this.props.postId," Rendered")
  }

  handleCommentSubmit(event) {
    const {addNewComment ,commentError,currentUser, tempUser, postId} = this.props
    event.preventDefault()
    let elem = $('#add-comment-'+postId).children()
  	$(elem).height(16)
  	if(this.state.text){
  		if(currentUser == tempUser){
    		addNewComment(postId,this.state.text,currentUser.id)
	    }else{
	    	addNewComment(postId,this.state.text,tempUser.id)
	    }
	    this.setState({text: ''})
  	}
  }

  handleCommentContentChange(event){
  	const {postId} = this.props
    event.preventDefault()
    let elem = $('#add-comment-'+postId)
    let textArea = elem.children()
    textArea = textArea[0]
    $(textArea).height(0).height(textArea.scrollHeight)
    this.setState({text: event.target.value})
  }

  handleUpdatePostContentChange(event){
  	event.preventDefault()
  	this.setState({updatePostContent: event.target.value})
  }

  handleUpdatePostSubmit(event){
  	if(this.state.updatePostContent){
  		this.props.updatePost(this.props.postId, this.state.updatePostContent)
  		$('#modal-'+this.props.postId).modal('hide')
  	}
  }

  handleDeletePostSubmit(event){
  	event.preventDefault()
  	this.props.deletePost(this.props.postId)
  }

  handleUpdateCommentSubmit(event){
  	const {updateComment ,currentUser, tempUser} = this.props
  	let id = $(event.target).data('id')
  	let content = $('#textarea-'+id).val()
  	if(content){
  		if(currentUser == tempUser){
	    	updateComment(id,content,currentUser.id)
	    }else{
	    	updateComment(id,content,tempUser.id)
	    }
	  	$('#comment-modal-'+id).modal('hide')
  	}
  }

  handleDeleteCommentSubmit(event){
  	const {deleteComment ,currentUser, tempUser} = this.props
  	let id = $(event.target).data('id')
  	if(currentUser == tempUser){
     	deleteComment(id,currentUser.id)
    }else{
    	deleteComment(id,tempUser.id)
    }
  }


  render() {
  	const {name,currentUser, tempUser,postId,post} = this.props

  	let editDeletePost = null
  	let deletable = false
  	let updated_at= null 
  	let content = null

  	// if(!post){
  	// 	return (
   //  		<div></div>
   //  	)
  	// }
		
  	if(tempUser == currentUser){

  		deletable = true

	  	editDeletePost = <div className="post-caret pull-right">
					<div className="dropdown">
	          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
	          <ul className="dropdown-menu pull-right dropdown-menu-post">
	            <li><a data-toggle="modal" data-target={"#modal-"+postId}>Edit Post</a></li>
	            <li><a onClick={this.handleDeletePostSubmit}>Delete</a></li>
	          </ul>
	        </div>
				</div>
  	}

  	let allComments = null
  	let allCommentsModals = null
  	if(post){
  		updated_at = post.updated_at
  		content = post.content
  		allComments = post.comments.map(comment => {
				let editComment = null
				if(comment.isEditable){
					editComment = <li><a data-toggle="modal" data-target={"#comment-modal-"+comment.id}>Edit</a></li>
				}

				let deleteComment = <li><a data-id={comment.id} onClick={this.handleDeleteCommentSubmit}>Delete</a></li>
				let editDeleteCommentBlock = null
				
				if(comment.isEditable || deletable){
					editDeleteCommentBlock = <div className="edit-comment-caret pull-right">
							<div className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
			          <ul className="dropdown-menu pull-right dropdown-menu-comment">
			            {editComment}
			            {deleteComment}
			          </ul>
		          </div>
						</div>
				}
				
				return (
					<div key={comment.id} className="comment-heading">
						<div className="comment-image-container">
							<div className="comment-image"><p>{getInitials(comment.name)}</p></div>
						</div>
						<div className="comment-content">
							<Link to={"/user/"+comment.user_id} className="comment-username">{comment.name}</Link>
							<div className="comment">{comment.content}</div>
							<ul className="ul-comment-like-share">
								<li><a href='javascript:void(0);'>Like</a></li>
								<li><a href='javascript:void(0);'>Reply</a></li>
								<li>{comment.updated_at}</li>
							</ul>
						</div>
						{editDeleteCommentBlock}
					</div>
				)
	  		}
			)

			allCommentsModals = post.comments.map(comment =>
				<div key={comment.id} className="modal fade" id={"comment-modal-"+comment.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
	        <div className="modal-dialog modal-m" role="document">
	          <div className="modal-content modal-content-style">
	            <div className="modal-header">
	              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	              <h4 className="modal-title" id="myModalLabel">Edit Comment</h4>
	            </div>
	            <div className="modal-body edit-modal-body-style">
			          <div className="comment-heading">
									<div className="edit-post-image-container">
			  						<div className="comment-image"><p>{getInitials(currentUser.name)}</p></div>
			  					</div>
			  					<div className="comment-content auto-text-area">
										<textarea id={"textarea-"+comment.id} className="edit-post-textarea" rows="4" placeholder="Write a comment">{comment.content}</textarea>
			  					</div>
			  				</div>
	            </div>
	            <div className="modal-footer">
	              <div className="row">
	                <div className="col-sm-offset-10 col-sm-2">
	                  <button type="submit" className="btn btn-primary send-message-btn" onClick={this.handleUpdateCommentSubmit} data-id={comment.id}>Update</button>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
			   	</div> 	
				)
  	}


    return (
    	<div>
  			<div className="posts-area">
					<div className="post-heading">
						<div className="post-image-container">
  						<div className="status-image"><p>{getInitials(tempUser.name)}</p></div>
  					</div>
  					<div className="post-name-time">
  						<Link to={"/user/"+tempUser.id}className="post-username">{name}</Link>
  						<div className="post-date">{updated_at}</div>
  					</div>
  					{editDeletePost}
	  			</div>
	  			<div className="post-content">{content}</div>
	  			<div className="post-like-share">
						<ul className="ul-post-like-share">
							<li><i className="fa fa-thumbs-up" aria-hidden="true"></i><a href='javascript:void(0);'>Like</a></li>
							<li><i className="fa fa-comment" aria-hidden="true"></i><a href='javascript:void(0);'>Comment</a></li>
							<li><i className="fa fa-share" aria-hidden="true"></i><a href='javascript:void(0);'>Share</a></li>
						</ul>
	  			</div>	
				</div>

				<div className="comments-area">
					{allComments}
					<form onSubmit={this.handleCommentSubmit}>
						<div className="add-comment-wrapper">
							<div className="comment-image-container">
	  						<div className="comment-image"><p>{getInitials(currentUser.name)}</p></div>
	  					</div>
	  					<div id={"add-comment-" + postId} className="add-comment-textarea-align">					  						
								<textarea className="comment-textarea" rows="1" value={this.state.text} onChange={this.handleCommentContentChange} placeholder="Write a comment"></textarea>
	  					</div>
	  					<div className="add-comment-btn-align">
								<button type="submit" className="btn btn-primary comment-btn">Comment</button>
	  					</div>		
						</div>
					</form>
				</div>

				<div className="modal fade" id={"modal-"+postId} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-m" role="document">
            <div className="modal-content modal-content-style">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Post</h4>
              </div>
              <div className="modal-body edit-modal-body-style">
                  <div className="edit-post-heading">
										<div className="edit-post-image-container">
				  						<div className="comment-image"><p>{getInitials(currentUser.name)}</p></div>
				  					</div>
				  					<div className="edit-post-content auto-text-area">
											<textarea className="edit-post-textarea" rows="4" value={this.state.updatePostContent} onChange={this.handleUpdatePostContentChange} placeholder="Write a post"></textarea>
				  					</div>
					  			</div>
              </div>
              <div className="modal-footer">
                <div className="row">
                  <div className="col-sm-offset-10 col-sm-2">
                    <button type="submit" className="btn btn-primary send-message-btn" onClick={this.handleUpdatePostSubmit}>Post</button>
                  </div>
                </div>         
              </div>
            </div>
          </div>
      	</div> 	
        {allCommentsModals}
        
      </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => ({
  post:state.posts.posts[ownProps.postId],
})

const mapDispatchToProps = { addNewComment, updateComment, deleteComment, updatePost, deletePost } 

Post = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)


export default Post;