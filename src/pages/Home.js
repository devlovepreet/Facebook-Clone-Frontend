import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/currentUser'
import Navbar from './components/Navbar'
import Profile from'./components/Profile'

class Home extends Component {
	constructor(props){
		super(props)
	}

  componentWillMount(){
    console.log("Home Mounted")
    this.props.getCurrentUser()
  }
  render() {

    const {user } = this.props
    console.log("Home Rendered")
    if(!user) {
      return (
        <div className="loader"></div>
      )
    }
    
    return (
    	<div>
    		<Navbar username={user.name}/>
        {this.props.children}
    	</div>
    );
  }
}

const mapStateToProps = state => ({
  fetching : state.currentUser.fetching,
  fetched : state.currentUser.fetched,
  user : state.currentUser.user,
  error : state.currentUser.error,
})

const mapDispatchToProps = { getCurrentUser } 

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home;