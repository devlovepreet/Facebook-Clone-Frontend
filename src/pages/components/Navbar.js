import React, { Component } from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import { getSearchResults } from '../../actions/search'
import { getRequests, confirmRequest, deleteRequest } from '../../actions/friendRequests'
import { postLogout } from '../../actions/login'
import facebookLiteLogo from '../../assets/images/facebook-lite-logo.jpg'
import { getInitials } from '../../helpers/Services'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleDeleteClick= this.handleDeleteClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.handleSearchBlur =  this.handleSearchBlur.bind(this)
  }

  componentWillMount(){
    console.log("Navbar Mounted")
    this.props.getRequests()
  }

  handleSearchTextChange(event){
  	event.preventDefault()
    const { getSearchResults } = this.props
    getSearchResults(event.target.value)
  }

  handleSearchBlur(event){
    event.preventDefault()
    console.log('Blur')
    // $('#search-box').val('')
    // this.props.getSearchResults('')
  }

  handleConfirmClick(event){
    let from_user_id = $(event.target).data('id')
    this.props.confirmRequest(from_user_id)
  }

  handleDeleteClick(event){
    let from_user_id = $(event.target).data('id')
    this.props.deleteRequest(from_user_id)
  }

  handleLogoutClick(event){
    const {postLogout} = this.props
    postLogout()
  }

  render() {
    // console.log("Profile")
    const {results, requests, username} = this.props

    let searchResultsLis = null
    searchResultsLis = results.map(user =>
      <li key={user.id}>
        <hr className="hr-style"/>
        <Link to={"/user/" + user.id}>
          <div className="request-image"><p>{getInitials(user.name)}</p></div>
          <div className="request-username">{user.name}</div>
        </Link>
      </li>
    )


    let allSearchResults = null
    // console.log(searchResultsLis.length)
    // console.log(searchResultsLis)
    if(searchResultsLis.length > 0){
      // console.log("allSearchResults : OK")
      allSearchResults = <ul className="dropdown-menu divResults"  aria-labelledby="search-box">
            {searchResultsLis}
        </ul>
    }else{
      allSearchResults = null
      // console.log("allSearchResults : NULL")
    }

    let friendRequestText = null
    if(requests.length > 0){
      friendRequestText =  <div className="friend-request-text">
          Friend Requests
        </div>
    }else{
      friendRequestText =  <div className="friend-request-text">
          No Friend Requests
        </div>
    }

    const allRequestsResults = requests.map(request =>
      <div key={request.id}>
        <div role="separator" className="divider"></div>
          <div className="row">
            <div className="col-sm-6">
              <Link className="request-link" to={"/user/" + request.from_id}>
                <div className="request-image"><p>{getInitials(request.name)}</p></div>
                <div className="request-username">{request.name}</div>
              </Link>
            </div>
            <div className="col-sm-6">
              <div className="request-buttons">
                <button className="btn btn-primary confirm-request-btn" data-id={request.from_id} onClick={this.handleConfirmClick}>Confirm</button>
                <button className="btn btn-primary delete-request-btn" data-id={request.from_id} onClick={this.handleDeleteClick}>Delete Request</button>
              </div>
            </div>
          </div>
      </div>
      )


    return (
      <nav className="navbar-blue">
		  	<div className="col-md-offset-2 col-md-8">
	      	<div className="row titlebar-left">
		      	<img alt="logo" className="fb-lite-logo" src={"/"+facebookLiteLogo}/>
            <div className="dropdown">
		          <input id="search-box" type="text" className="form-control form-specs" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={this.handleSearchTextChange} onBlur={this.handleSearchBlur} placeholder="Search Users here"/>       
		          {allSearchResults}
            </div>
          </div>
		      <ul className="nav navbar-nav navbar-right">
		        <li><Link to="/user"><div className="nav-profile-image"><p>{getInitials(username)}</p></div>{username}</Link></li>
		        <li><Link to="/user">Home</Link></li>
            <li>
              <a href="#" id="navbar-caret" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-plus" aria-hidden="true"></i></a>
              <div className="dropdown-menu dropdown-width">
                {friendRequestText}
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