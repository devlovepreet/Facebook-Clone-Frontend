import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Profile from'./components/Profile'

class Home extends Component {
  render() {
    return (
    	<div>
      		<Navbar/>
      		<Profile/>
      	</div>
    );
  }
}

export default Home;