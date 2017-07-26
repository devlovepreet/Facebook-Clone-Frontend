import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/getCurrentUserData'
import Navbar from './components/Navbar'
import Profile from'./components/Profile'

class Home extends Component {
	constructor(props){
		super(props)
	}

  componentWillMount(){
    this.props.getCurrentUser()
  }
  render() {

    const {user } = this.props
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
  fetching : state.getCurrentUserData.fetching,
  fetched : state.getCurrentUserData.fetched,
  user : state.getCurrentUserData.user,
  error : state.getCurrentUserData.error,
})

const mapDispatchToProps = { getCurrentUser } 

Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default Home;