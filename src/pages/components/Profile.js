import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileResults, getProfileResultsById } from '../../actions/profileFetch'
import { addNewPost } from '../../actions/addPost'
import Post from './Post'

class Profile extends Component {

	constructor(props) {
    super(props)
    this.state = {content: ''}
    this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
    this.handlePostContentChange = this.handlePostContentChange.bind(this)
  }

  componentWillMount(){
  	this.props.getProfileResults()
  }

  handlePostSubmit(event) {
    const {addNewPost, getProfileResults, postError} = this.props
    event.preventDefault()
    addNewPost(this.state.content)
    console.log("Post Submitted")
    if(!postError){
      this.setState({content: ''})
    }

    console.log("Profile Results Updated")
  }

  handleCommentSubmit(event){
  	event.preventDefault();
  	console.log("Comment Added")
  }

  handlePostContentChange(event){
    event.preventDefault()
    this.setState({content: event.target.value})
  }

  render() {

  	const {error, user, fetching, fetched, posting , posted, postError} = this.props

    if(!user) {
    	return (
    		<div>fetching</div>
    	)
    }

    let errorDiv = null
    let buttonDisabled = null
    let successDiv = null
    if(posting) {
      buttonDisabled = "disabled"
    }
    if(!posting && postError) {
      console.log(postError)
      errorDiv = <div className="error-message-block">{postError}</div>
    } else if(!posting && posted && !postError){
      console.log("Post Success");
      successDiv = <div className="success-message-block">Post Added</div>
    }


    return (
      <div className="col-sm-offset-2 col-sm-8">
  			<div className="cover">
  				<img src="/cover.jpg" className="img-responsive center-block cover-width"/>
  				<img src="/profile.jpg" className="image-responsive profile-image"/>
  				<div className="user-name">{ user.name }</div>
	  				<button type="button" className="btn btn-default btn-message">
					    <span className="glyphicon glyphicon-envelope"></span> Message
					  </button>
					 
  			</div>

  			<div className="row">
  				<div className="col-sm-4">
  					<div className="sidebar">
  						THIS IS SIDEBAR
  					</div>
  				</div>
  				<div className="col-sm-8">

  				<div className="add-post">
              <form onSubmit={this.handlePostSubmit}>
							<table className="status-heading">
                <tbody>
								<tr>
									<td className="status-image-container">
			  						<img src="/profile.jpg" className="img-responsive status-image"/>
			  					</td>
			  					<td className="status-title">
											 <textarea className="form-control status-textarea" placeholder="What's on your mind ?" value={this.state.content} onChange={this.handlePostContentChange} ></textarea>
			  					</td>
		  						</tr>	
                </tbody>
		  					</table>
		  					<div className="row">
			  					<div className="col-sm-offset-10 col-sm-2">
			  						<button type="submit" className={"btn btn-primary status-btn "+ buttonDisabled}>Post</button>
			  					</div>
		  					</div>
              </form>

                {errorDiv}
                {successDiv}
		  				 
				</div>

					{ user.posts.map(post =>
		      	<Post
		        key={post.id}
		        {...post}
		        name={user.name}
		      />) 
				}

  			</div>	
      </div> 	
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetching : state.profileFetch.fetching,
  fetched : state.profileFetch.fetched,
  user : state.profileFetch.user,
  error : state.profileFetch.error,
  posting: state.addPost.posting,
  posted:state.addPost.posted,
  postError: state.addPost.error
})

const mapDispatchToProps = { getProfileResults , getProfileResultsById, addNewPost } 

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile;