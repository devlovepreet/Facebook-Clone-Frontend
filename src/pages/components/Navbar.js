import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSearchResults } from '../../actions/search'
import { getRequests } from '../../actions/fetchRequests'

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(event){
  	event.preventDefault()
    const { getSearchResults } = this.props
    console.log(event.target.value)
    getSearchResults(event.target.value)
  }

  render() {

    const {results, requests} = this.props

    console.log(results)

   
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
                  <div className="request-buttons"><button className="btn btn-primary confirm-request-btn">Confirm</button><button className="btn btn-primary delete-request-btn">Delete Request</button></div>
                </div>
              </div>
        </div>
      )


    return (
      <nav className="navbar-changed navbar-blue">
		  	<div className="col-md-offset-2 col-md-8">
	      	<div className="row titlebar-left">
		      	<img alt="logo" className="fb-lite-logo" src="/facebook-lite-logo.jpg"/>
		        <input id="search-box" type="text" className="form-control form-specs" onChange={this.handleSearchTextChange} placeholder="Search Users here"/>       
		      </div>

		      <ul className="nav navbar-nav navbar-right">
		        <li><a href="#">Lovepreet Singh</a></li>
		        <li><a href="#">Home</a></li>
           
           <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user-plus" aria-hidden="true"></i></a>
            <div className="dropdown-menu dropdown-width">
              <div className="friend-request-text">Friend Requests</div>
              
              {allRequestsResults}

            </div>
          </li>

          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i className="fa fa-caret-down" aria-hidden="true"></i></a>
            <ul className="dropdown-menu">
              <li><a href="#">Activity log</a></li>
              <li><a href="#">Settings</a></li>
              <li><a href="#">Log out</a></li>
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
  requestFetching : state.fetchRequests.fetching,
  requests : state.fetchRequests.results
})

const mapDispatchToProps = {getSearchResults, getRequests}

Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export default Navbar;