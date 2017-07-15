import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSearchResults } from '../../actions/search'

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
    return (
      <nav className="navbar-changed navbar-blue">
		  	<div className="col-md-offset-2 col-md-8">
	      	<div className="row titlebar-left">
		      	<img alt="logo" className="fb-lite-logo" src="/facebook-lite-logo.jpg"/>
		        <input type="text" className="form-control form-specs" onChange={this.handleSearchTextChange} placeholder="Search Users here"/>       
		       </div>
		      <ul className="nav navbar-nav navbar-right">
		        <li><a href="#">Lovepreet Singh</a></li>
		        <li><a href="#">Home</a></li>
		      </ul>
			  </div>
			</nav>
    );
  }
}

const mapStateToProps = state => ({
  fetching : state.profileSearch.fetching,
  results : state.profileSearch.results
})

const mapDispatchToProps = {getSearchResults}

Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export default Navbar;