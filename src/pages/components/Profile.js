import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProfileResults, getProfileResultsById } from '../../actions/profileFetch'
import { sendRequest, deleteRequest, deleteRequestByUserId } from '../../actions/friendRequests'
import { sendMessage, getMessages } from '../../actions/messages'
import { addNewPost } from '../../actions/posts'
import Post from './Post'
import $ from '../../jquery'
import CoverImage from '../../cover.jpg'
import {getInitials} from '../../Services'

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

  handlePostSubmit(event) {
    const {addNewPost, getProfileResults, postError} = this.props
    event.preventDefault()
    let elem = $('#status-td').children()
    $(elem).height(40)

    if(this.state.content){
      addNewPost(this.state.content)
      this.setState({content: ''})
    }      
  }

  handlePostContentChange(event){
    event.preventDefault()
    let elem = $('#status-td')
    let textArea = elem.children()
    textArea = textArea[0]
    $(textArea).height(0).height(textArea.scrollHeight)
    this.setState({content: event.target.value})
  }

  handleSendRequestClick(event){
    event.preventDefault()
    this.props.sendRequest(this.props.user.id )
  }

  handleCancelRequestClick(event){
    event.preventDefault()
    this.props.deleteRequestByUserId(this.props.user.id)
  }

  handleMessageTextOnChange(event){
    event.preventDefault()
    let elem = $('#message-div')
    let textArea = elem.children()
    textArea = textArea[0]
    $(textArea).height(0).height(textArea.scrollHeight)
    this.setState({messageText: event.target.value})
  }

  handleSendMessageClick(event){
    if(this.state.messageText){
      this.props.sendMessage(this.props.user.id,this.state.messageText)
      this.setState({messageText:''})

      let elem = $('#message-div').children()
      console.log(elem)
      $(elem).height(16)
    }
  }

  handleMessageButtonClick(event){
    this.props.getMessages(this.props.user.id)
  }

  render() {
  	const {error, user, fetching, fetched, posting , posted , currentUser, messages, getProfileResultsById} = this.props
    let tempUser = null
    let profileId = this.props.params.user_id
    profileId = parseInt(profileId)
    if(profileId && profileId !== currentUser.id) {
      if (user && user.id === profileId) {
        tempUser = user
      } else if (!fetching) {
        console.log("dhiraj", fetching)
        getProfileResultsById(profileId)
      }
    } else {
      tempUser = currentUser
    }

    if(!tempUser) {
    	return (
    		<div className="loader"></div>
    	)
    }

    let buttonDisabled = null
    if(posting) {
      buttonDisabled = "disabled"
    }

    let buttons = null
    let status = null
    let allMessages = null
    if(tempUser == currentUser){
      
      status = <div className="add-post">
          <form onSubmit={this.handlePostSubmit} className="status-form-align">
            <div className="status-heading">
              <div className="status-image-container">
                <div className="status-image"><p>{getInitials(tempUser.name)}</p></div>
              </div>
              <div id="status-td" className="status-title">
                <textarea className="form-control status-textarea" placeholder="What's on your mind ?" value={this.state.content} onChange={this.handlePostContentChange} ></textarea>
              </div>
            </div>
            <div className="status-post">
              <button type="submit" className={"btn btn-primary status-btn status-btn-align "+ buttonDisabled}>Post</button>
            </div>
          </form>
        </div>

    }else{
      if(tempUser.isFriends){
        // this user is friend of current user
        if(messages){
          allMessages = messages.map(message => {
            if(message.from_user_id==tempUser.id) {
              return (
                <div key={message.id} className="row">
                  <div className="col-sm-1">
                    <div className="comment-image"><p>{getInitials(tempUser.name)}</p></div>
                  </div>
                  <div className="col-sm-11">
                    <p className="message-left">{message.content}</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={message.id} className="row">
                  <div className="col-sm-11">
                    <p className="message-right">{message.content}</p>
                  </div>
                </div>
              )
            }
          })
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
  				<img src={"/"+CoverImage} className="img-responsive center-block cover-width"/>
  				<div className="profile-image prof-chars"><p>{getInitials(tempUser.name)}</p></div>
  				<span href={"/user/"+tempUser.id} className="user-name">{ tempUser.name }</span>
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
                  <div className="col-sm-11">
                    <div id="message-div" className="message-textarea-align">
                      <textarea className="message-textarea" rows="1" value={this.state.messageText} onChange={this.handleMessageTextOnChange} placeholder="Type a message ..."></textarea>
                    </div>
                  </div>
                  <div className="col-sm-1">
                    <div className="message-btn-align">
                      <button type="submit" className="btn btn-primary send-message-btn" onClick={this.handleSendMessageClick}>Send</button>
                    </div>
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
  posting: state.posts.fetching,
  posted:state.posts.fetched,
  currentUser : state.currentUser.user,
  messages: state.messages.results
})

const mapDispatchToProps = { getProfileResults , getProfileResultsById, addNewPost,sendRequest, deleteRequest, deleteRequestByUserId, sendMessage, getMessages} 

Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)

export default Profile;