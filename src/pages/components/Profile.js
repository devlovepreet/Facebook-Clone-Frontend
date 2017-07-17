import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileResults, getProfileResultsById } from '../../actions/profileFetch'
import {sendRequest, deleteRequest} from '../../actions/friendRequests'
import {sendMessage, getMessages} from '../../actions/messages'
import { addNewPost } from '../../actions/addPost'
import Post from './Post'


class Profile extends Component {

	constructor(props) {
    super(props)
    this.state = {content: '', messageText:''}
    this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.handlePostContentChange = this.handlePostContentChange.bind(this)
    this.handleSendRequestClick = this.handleSendRequestClick.bind(this)
    this.handleCancelRequestClick = this.handleCancelRequestClick.bind(this)
    this.handleMessageButtonClick = this.handleMessageButtonClick.bind(this)
    this.handleSendMessageClick = this.handleSendMessageClick.bind(this)
    this.handleMessageTextOnChange = this.handleMessageTextOnChange.bind(this)
  }

  componentWillMount(){
    console.log("Profile Mounted")
    if(this.props.params.user_id){
      console.log(this.props.currentUser.id)
      console.log(this.props.params.user_id)
      if(this.props.params.user_id == this.props.currentUser.id){
        // this.props.getProfileResults();
      }else{
        this.props.getProfileResultsById(this.props.params.user_id)
      }
    }else{
     // this.props.getProfileResults();
    }
  }

  handlePostSubmit(event) {
    const {addNewPost, getProfileResults, postError} = this.props
    event.preventDefault()
    addNewPost(this.state.content)
    if(!postError){
      this.setState({content: ''})
    }

    console.log("Profile Results Updated")
  }

  handlePostContentChange(event){
    event.preventDefault()
    this.setState({content: event.target.value})
  }

  handleSendRequestClick(event){
    event.preventDefault()
    this.props.sendRequest(this.props.user.id )
  }

  handleCancelRequestClick(event){
    // this.props.deleteRequest()
  }

  handleMessageTextOnChange(event){
    event.preventDefault()
    this.setState({messageText: event.target.value})
  }

  handleSendMessageClick(event){
    if(this.state.messageText){
      this.props.sendMessage(this.props.user.id,this.state.messageText)
      this.setState({messageText:''})
    }
  }

  handleMessageButtonClick(event){
    this.props.getMessages(this.props.user.id)
  }

  render() {

    console.log("Profile Rendered")

  	const {error, user, fetching, fetched, posting , posted, postError , currentUser, messages} = this.props

    let tempUser = this.props.params.user_id ? (this.props.params.user_id == this.props.currentUser.id ? currentUser : user ) : currentUser 

    if(!tempUser) {
    	return (
    		<div className="loader"></div>
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

    let buttons = null
    let status = null
    let allMessages = null
    if(tempUser == currentUser){
      // no buttons to show yet
      status = <div className="add-post">
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

    }else{
      if(tempUser.isFriends){
        // this user is friend of current user
        if(messages){
          allMessages = messages.map(message =>
                message.from_user_id==tempUser.id?
                  <div key={message.id} className="row">
                        <div className="col-sm-1">
                          <img src="/profile.jpg" className="img-responsive comment-image"/>
                        </div>
                        <div className="col-sm-11">
                          <p className="message-left">{message.content}</p>
                        </div>
                  </div>
                :
                
                  <div key={message.id} className="row">
                        <div className="col-sm-11">
                          <p className="message-right">{message.content}</p>
                        </div>
                  </div>
          )
        }
          

        buttons = <a type="button" className="btn btn-default btn-message" data-toggle="modal" data-target="#myModal" onClick={this.handleMessageButtonClick}>
              <i className="fa fa-envelope" aria-hidden="true"></i> Message
            </a>

      }else{

        if(tempUser.status == "pending"){
           buttons = <a type="button" className="btn btn-default btn-message" onClick={this.handleCancelRequestClick}>
              <i className="fa fa-user-times" aria-hidden="true"></i> Cancel Friend Request
            </a>
        }else{
          buttons = <a type="button" className="btn btn-default btn-message" onClick={this.handleSendRequestClick}>
              <i className="fa fa-user-plus" aria-hidden="true"></i> Send Friend Request
            </a>
        }

      }
    }


    return (
      <div className="col-sm-offset-2 col-sm-8">
  			<div className="cover">
  				<img src="/cover.jpg" className="img-responsive center-block cover-width"/>
  				<img src="/profile.jpg" className="image-responsive profile-image"/>
  				<a className="user-name">{ tempUser.name }</a>

	  				{buttons}
					 
  			</div>

  			<div className="row">
  				<div className="col-sm-4">
  					<div className="sidebar">
  						THIS IS SIDEBAR
  					</div>
  				</div>
  				<div className="col-sm-8">

  				{status}


					{ tempUser.posts.map(post =>
		      	<Post
		        key={post.id}
		        {...post}
		        name={tempUser.name}
            post_id={post.id}
            currentUser = {currentUser}
            tempUser={tempUser}
		      />) 
				}

  			</div>	
      </div>

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content modal-content-style">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">{tempUser.name}</h4>
              </div>
              <div className="modal-body modal-body-style">
                  {allMessages}
              </div>
              <div className="modal-footer">
                  <div className="row">
                    <div className="col-sm-10">
                      <textarea className="message-textarea" rows="1" value={this.state.messageText} onChange={this.handleMessageTextOnChange} placeholder="Type a message ..."></textarea>
                    </div>
                    <div className="col-sm-2">
                      <button type="submit" className="btn btn-primary send-message-btn" onClick={this.handleSendMessageClick}>Send</button>
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
  fetching : state.profileFetch.fetching,
  fetched : state.profileFetch.fetched,
  user : state.profileFetch.user,
  error : state.profileFetch.error,
  posting: state.addPost.posting,
  posted:state.addPost.posted,
  postError: state.addPost.error,
  currentUser : state.currentUser.user,
  messages: state.messages.results
})

const mapDispatchToProps = { getProfileResults , getProfileResultsById, addNewPost ,sendRequest, deleteRequest, sendMessage, getMessages} 

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile;