import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewComment, updateComment, deleteComment } from '../../actions/comments'
import { updatePost, deletePost } from '../../actions/posts'

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

  handleCommentSubmit(event) {
    const {addNewComment ,commentError,currentUser, tempUser, id} = this.props
    event.preventDefault()
    let elem = $('#add-comment-'+id).children()
  	$(elem).height(16)
  	if(this.state.text){
  		if(currentUser == tempUser){
    		addNewComment(this.props.post_id,this.state.text,currentUser.id)
	    }else{
	    	addNewComment(this.props.post_id,this.state.text,tempUser.id)
	    }
	    this.setState({text: ''})
  	}
    
      
  }

  handleCommentContentChange(event){
  	const {id} = this.props
    event.preventDefault()
    let elem = $('#add-comment-'+id)
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
  	console.log("Post submit")
  	if(this.state.updatePostContent){
  		this.props.updatePost(this.props.id, this.state.updatePostContent)
  		$('#modal-'+this.props.id).modal('hide')
  	}
  }

  handleDeletePostSubmit(event){
  	event.preventDefault()
  	this.props.deletePost(this.props.id)
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

  getInitials(string) {
    var names = string.split(' '),
      initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials;
  }

  render() {

  	const {id, name, updated_at, content , comments, currentUser, tempUser} = this.props
  	let addComment = null
  	let editDelete = null
  	let allComments = null
  	let commentsEditModals = null

  	if(tempUser == currentUser){

  		addComment = <form onSubmit={this.handleCommentSubmit}>
					<table className="comment-heading">
						<tbody>
							<tr>
								<td className="comment-image-container">
		  						<div className="comment-image"><p>{this.getInitials(currentUser.name)}</p></div>
		  					</td>
		  					<td id={"add-comment-" + id} className="add-comment-textarea-align">					  						
									<textarea className="comment-textarea" rows="1" value={this.state.text} onChange={this.handleCommentContentChange} placeholder="Write a comment"></textarea>
		  					</td>
		  					<td className="add-comment-btn-align">
									<button type="submit" className="btn btn-primary comment-btn">Comment</button>
		  					</td>		
							</tr>
						</tbody>
					</table>
				</form>

	  	editDelete = <td className="status-caret pull-right">
					<div className="dropdown">
	          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
	          <ul className="dropdown-menu pull-right dropdown-menu-post">
	            <li><a data-toggle="modal" data-target={"#modal-"+id}>Edit Post</a></li>
	            <li><a onClick={this.handleDeletePostSubmit}>Delete</a></li>
	          </ul>
	        </div>
				</td>

  		allComments = comments.map(comment => {
  			let editCommentBlock = null
  			if(comment.isEditable){
  				editCommentBlock = <li><a data-toggle="modal" data-target={"#comment-modal-"+comment.id}>Edit</a></li>
  			}

  			return (
	  				<table key={comment.id} className="comment-heading">
			  			<tbody>
								<tr>
									<td className="comment-image-container">
										<div className="comment-image"><p>{this.getInitials(comment.name)}</p></div>
									</td>
									<td className="comment-content">
										<a href={"/user/"+comment.user_id} className="comment-username">{comment.name}</a>
										<div className="comment">{comment.content}</div>
										<ul className="ul-comment-like-share">
											<li><a href='javascript:void(0);'>Like</a></li>
											<li><a href='javascript:void(0);'>Reply</a></li>
											<li>{comment.updated_at}</li>
										</ul>
									</td>
									<td className="edit-comment-caret pull-right">
										<div className="dropdown">
					            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
					            <ul className="dropdown-menu pull-right dropdown-menu-comment">
					            	{editCommentBlock}
					              <li><a data-id={comment.id} onClick={this.handleDeleteCommentSubmit}>Delete</a></li>
					            </ul>
				          	</div>
									</td>
									</tr>
							</tbody>
						</table>
  				)
  			} 
	  	)

  		commentsEditModals = comments.map(comment =>
				<div key={comment.id} className="modal fade" id={"comment-modal-"+comment.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
	        <div className="modal-dialog modal-m" role="document">
	          <div className="modal-content modal-content-style">
	            <div className="modal-header">
	              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	              <h4 className="modal-title" id="myModalLabel">Edit Comment</h4>
	            </div>
	            <div className="modal-body edit-modal-body-style">
			          <table className="comment-heading">
				  				<tbody>
										<tr>
											<td className="edit-post-image-container">
					  						<div className="comment-image"><p>{this.getInitials(currentUser.name)}</p></div>
					  					</td>
					  					<td className="comment-content auto-text-area">
												<textarea id={"textarea-"+comment.id} className="edit-post-textarea" rows="4" placeholder="Write a comment">{comment.content}</textarea>
					  					</td>
										</tr>
				  				</tbody>
			  				</table>
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
  	else{

  		if(tempUser.isFriends){

  			addComment = <form onSubmit={this.handleCommentSubmit}>
	  				<table className="comment-heading">
		  				<tbody>
								<tr>
									<td className="comment-image-container">
			  						<div className="comment-image"><p>{this.getInitials(currentUser.name)}</p></div>
			  					</td>
			  					<td id={"add-comment-" + id} className="add-comment-textarea-align">
										<textarea className="comment-textarea" rows="1" value={this.state.text} onChange={this.handleCommentContentChange} placeholder="Write a comment"></textarea>
			  					</td>
			  					<td className="add-comment-btn-align">
										<button type="submit" className="btn btn-primary comment-btn">Comment</button>
			  					</td>
		  					</tr>
		  				</tbody>
	  				</table>
  				</form>

	  		allComments = comments.map(comment => {
	  				let editDeleteCommentBlock = null
  					if(comment.isEditable){
  						editDeleteCommentBlock = <td className="edit-comment-caret pull-right">
									<div className="dropdown">
					          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
					          <ul className="dropdown-menu pull-right dropdown-menu-comment">
					            <li><a data-toggle="modal" data-target={"#comment-modal-"+comment.id}>Edit</a></li>
					            <li><a data-id={comment.id} onClick={this.handleDeleteCommentSubmit}>Delete</a></li>
					          </ul>
				          </div>
								</td>
  					}
	  				
	  				return (
	  					<table key={comment.id}className="comment-heading">
				  			<tbody>
									<tr>
										<td className="comment-image-container">
											<div className="comment-image"><p>{this.getInitials(comment.name)}</p></div>
										</td>
										<td className="comment-content">
											<a href={"/user/"+comment.user_id} className="comment-username">{comment.name}</a>
											<div className="comment">{comment.content}</div>
											<ul className="ul-comment-like-share">
												<li><a href='javascript:void(0);'>Like</a></li>
												<li><a href='javascript:void(0);'>Reply</a></li>
												<li>{comment.updated_at}</li>
											</ul>
										</td>
										{editDeleteCommentBlock}
									</tr>
								</tbody>
							</table>
						)
	  			}
  			)

	  		commentsEditModals = comments.map(comment =>
					<div key={comment.id} className="modal fade" id={"comment-modal-"+comment.id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
	          <div className="modal-dialog modal-m" role="document">
	            <div className="modal-content modal-content-style">
	              <div className="modal-header">
	                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	                <h4 className="modal-title" id="myModalLabel">Edit Comment</h4>
	              </div>
	              <div className="modal-body edit-modal-body-style">
	                <table className="comment-heading">
		  							<tbody>
											<tr>
												<td className="edit-post-image-container">
						  						<div className="comment-image"><p>{this.getInitials(currentUser.name)}</p></div>
						  					</td>
						  					<td className="comment-content auto-text-area">
													<textarea id={"textarea-"+comment.id} className="edit-post-textarea" rows="4" placeholder="Write a comment">{comment.content}</textarea>
						  					</td>
	  									</tr>
		  							</tbody>
		  						</table>
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
  	}

    return (
    	<div>
  			<div className="posts-area">
					<table className="post-heading">
						<tbody>
							<tr>
								<td className="post-image-container">
		  						<div className="status-image"><p>{this.getInitials(tempUser.name)}</p></div>
		  					</td>
		  					<td className="status-content">
		  						<a href={"/user/"+tempUser.id}className="post-username">{name}</a>
		  						<div className="post-date">{updated_at}</div>
		  					</td>
		  					{editDelete}
							</tr>
						</tbody>
	  			</table>
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
						{addComment}
				</div>
				<div className="modal fade" id={"modal-"+id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-m" role="document">
            <div className="modal-content modal-content-style">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Post</h4>
              </div>
              <div className="modal-body edit-modal-body-style">
                  <table className="comment-heading">
					  				<tbody>
											<tr>
												<td className="edit-post-image-container">
						  						<div className="comment-image"><p>{this.getInitials(currentUser.name)}</p></div>
						  					</td>
						  					<td className="status-content auto-text-area">
													<textarea className="edit-post-textarea" rows="4" value={this.state.updatePostContent} onChange={this.handleUpdatePostContentChange} placeholder="Write a post"></textarea>
						  					</td>
					  					</tr>
					  				</tbody>
					  			</table>
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
        {commentsEditModals}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  commenting : state.comments.fetching,
  commented : state.comments.fetched,
  commentError : state.comments.error,
  postFetching : state.posts.fetching,
  postFetched: state.posts.fetched
})

const mapDispatchToProps = { addNewComment, updateComment, deleteComment, updatePost, deletePost } 

Post = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)


export default Post;