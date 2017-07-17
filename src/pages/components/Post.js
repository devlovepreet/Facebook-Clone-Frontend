import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewComment } from '../../actions/addComment'

class Post extends Component {
	constructor(props) {
    super(props)
    this.state = {text: ''}
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handleCommentContentChange = this.handleCommentContentChange.bind(this)
  }

  handleCommentSubmit(event) {
    const {addNewComment ,commentError} = this.props
    event.preventDefault()
    console.log(this.props.post_id)
    addNewComment(this.props.post_id,this.state.text)
    console.log("Comment Submitted")
    if(!commentError){
      this.setState({text: ''})
    }

  }

  handleCommentContentChange(event){
    event.preventDefault()
    this.setState({text: event.target.value})
  }

  render() {
  	const {id, name, updated_at, content , comments} = this.props

  	const allComments = comments.map(comment => 
  		<table key={comment.id}className="comment-heading">
  			<tbody>
				<tr>
					<td className="post-image-container">
						<img src="/profile.jpg" className="img-responsive comment-image"/>
					</td>
					<td className="post-title">
						<div className="comment-username">{comment.name}</div>
						<div className="comment">{comment.content}</div>
					</td>
					</tr>
					</tbody>
			</table>
  	)



    return (
    	<div>
  			<div className="posts-area">
					<table className="post-heading">
						<tbody>
						<tr>
							<td className="post-image-container">
	  						<img src="/profile.jpg" className="img-responsive post-image"/>
	  					</td>
	  					<td className="post-title">
	  						<div className="post-username">{name}</div>
	  						<div className="post-date">{updated_at}</div>
	  					</td>
	  					<td className="">
	  						<div className="dropdown">
		            <a href="#" className="dropdown-toggle dropdown-caret-post" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
		            <ul className="dropdown-menu dropdown-menu-post">
		              <li><a data-toggle="modal" data-target={"#modal-"+id}>Edit Post</a></li>
		              <li><a href="#">Delete</a></li>
		            </ul>
	          	</div>
	  					</td>
  					</tr>
  					</tbody>
  				</table>
  				<div className="post-content">{content}</div>
  						
				</div>

				<div className="comments-area">
						{allComments}
					<form onSubmit={this.handleCommentSubmit}>
	  				<table className="comment-heading">
	  				<tbody>
							<tr>
								<td className="post-image-container">
		  						<img src="/profile.jpg" className="img-responsive comment-image"/>
		  					</td>
		  					<td className="status-title">
									<textarea className="comment-textarea" rows="1" value={this.state.text} onChange={this.handleCommentContentChange} placeholder="Write a comment"></textarea>
		  					</td>

		  					<td className="status-title">
									<button type="submit" className="btn btn-primary comment-btn">Comment</button>
		  					</td>
		  					
	  					</tr>
	  					</tbody>
	  				</table>
	  				</form>
				</div>


				<div className="modal fade" id={"modal-"+id} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-m" role="document">
            <div className="modal-content modal-content-style">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Edit Post</h4>
              </div>
              <div className="modal-body edit-modal-body-style">
                  <div className="row">
                    <div className="col-sm-2">
                      <img src="/profile.jpg" className="img-responsive comment-image"/>
                    </div>
                    <div className="col-sm-10">
                      <textarea className="status-textarea" value={this.state.text} onChange={this.handleCommentContentChange} placeholder="Write a comment"></textarea>
                    </div>
                  </div>
              </div>
              <div className="modal-footer">
                  <div className="row">
                    <div className="col-sm-offset-10 col-sm-2">
                      <button type="submit" className="btn btn-primary send-message-btn">Post</button>
                    </div>
                  </div>
          
              </div>
            </div>
          </div>
        </div> 	



      	</div>
    );
  }
}

const mapStateToProps = state => ({
  commenting : state.addComment.commenting,
  commented : state.addComment.commented,
  commentError : state.addComment.error,
})

const mapDispatchToProps = { addNewComment } 

Post = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)



export default Post;