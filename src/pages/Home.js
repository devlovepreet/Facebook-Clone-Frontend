import React, { Component } from 'react'
import Navbar from './components/Navbar'
import Profile from'./components/Profile'

class Home extends Component {
	constructor(props){
		super(props)
	}
  render() {
    console.log(this.props)
    return (
    	<div>
      		<Navbar/>
          {this.props.children}
      	</div>
    );
  }
}

export default Home;