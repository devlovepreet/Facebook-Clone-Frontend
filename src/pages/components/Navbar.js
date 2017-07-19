import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSearchResults } from '../../actions/search'
import { getRequests, confirmRequest, deleteRequest } from '../../actions/friendRequests'
import { postLogout } from '../../actions/login'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleDeleteClick= this.handleDeleteClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  componentWillMount(){
    console.log("Navbar Mounted")
    this.props.getRequests()
  }

  handleSearchTextChange(event){
  	event.preventDefault()
    const { getSearchResults } = this.props
    // console.log(event.target.value)
    getSearchResults(event.target.value)
  }

  handleConfirmClick(event){
    this.props.confirmRequest(event.target.id)
  }

  handleDeleteClick(event){
    this.props.deleteRequest(event.target.id)
  }

  handleLogoutClick(event){
    const {postLogout} = this.props
    postLogout()
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

    console.log("Navbar Rendered")

    const {results, requests, username} = this.props

    const allSearchResults = results.map(user =>
      <div key={user.id}>
      <hr className="hr-style"/>
       <div className="row">
        <div className="col-sm-12">
          <a href={"/user/" + user.id}>
          <span className="request-image"><img src="/profile.jpg" className="img-responsive comment-image"/></span>
          <span className="request-username">{user.name}</span>
          </a>
        </div>
      </div>
      </div>
    )

    const allRequestsResults = requests.map(request =>
        <div key={request.id}>
          <div role="separator" className="divider"></div>
              <div className="row">
                <div className="col-sm-6">
                  <span className="request-image"><img src="/profile.jpg" className="img-responsive comment-image"/></span>
                  <span className="request-username">{request.name}</span>
                </div>
                <div className="col-sm-6">
                  <div className="request-buttons">
                    <button className="btn btn-primary confirm-request-btn" id={request.id} onClick={this.handleConfirmClick}>Confirm</button>
                    <button className="btn btn-primary delete-request-btn" id={request.id} onClick={this.handleDeleteClick}>Delete Request</button>
                  </div>
                </div>
              </div>
        </div>
      )


    return (
      <nav className="navbar-blue">
		  	<div className="col-md-offset-2 col-md-8">
	      	<div className="row titlebar-left">
		      	<img alt="logo" className="fb-lite-logo" src="/facebook-lite-logo.jpg"/>
		        <input id="search-box" type="text" className="form-control form-specs" onChange={this.handleSearchTextChange} placeholder="Search Users here"/>       
		      </div>

		      <ul className="nav navbar-nav navbar-right">
		        <li><a href="/user"><div className="nav-profile-image"><p>{this.getInitials(username)}</p></div>{username}</a></li>
		        <li><a href="/user">Home</a></li>
           
           <li>
            <a href="#" id="navbar-caret" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-plus" aria-hidden="true"></i></a>
            <div className="dropdown-menu dropdown-width">
              <div className="friend-request-text">Friend Requests</div>
              
              {allRequestsResults}

            </div>
          </li>

          <li>
            <a href="#" id="navbar-caret" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul className="dropdown-menu dropdown-logout">
              <li><a href="#">Activity log</a></li>
              <li><a href="#">Settings</a></li>
              <li><a onClick={this.handleLogoutClick}>Log out</a></li>
            </ul>
           
          </li>
		      </ul>

          <div id="divResults">
          {allSearchResults}
          </div>

			  </div>
			</nav>
    );
  }
}

const mapStateToProps = state => ({
  fetching : state.profileSearch.fetching,
  results : state.profileSearch.results,
  requestsFetching : state.friendRequests.fetching,
  requestsFetched : state.friendRequests.fetched,
  requests : state.friendRequests.results,
  requestsSuccess: state.friendRequests.success,
  requestsError:state.friendRequests.error,
  logoutFetching:state.validate.fetching,
  logoutFetched:state.validate.fetched,
  logoutError:state.validate.error
})

const mapDispatchToProps = {getSearchResults, getRequests, confirmRequest, deleteRequest, postLogout}

Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export default Navbar;