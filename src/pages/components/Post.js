import React, { Component } from 'react'

class Post extends Component {
	constructor(props) {
    super(props)
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
		  					</tr>
		  					</tbody>
		  				</table>
		  				<div className="post-content">{content}</div>
						</div>

						<div className="comments-area">
								{allComments}
			  				<table className="comment-heading">
			  				<tbody>
									<tr>
										<td className="post-image-container">
				  						<img src="/profile.jpg" className="img-responsive comment-image"/>
				  					</td>
				  					<td className="status-title">
											<textarea className="comment-textarea" rows="1" placeholder="Write a comment"></textarea>
				  					</td>

				  					<td className="status-title">
											<button type="submit" className="btn btn-primary">Comment</button>
				  					</td>
				  					
			  					</tr>
			  					</tbody>
			  				</table>
						</div>
      	</div>
    );
  }
}


export default Post;