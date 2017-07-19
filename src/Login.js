import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postLogin } from './actions/login'
import { Redirect, withRouter } from 'react-router'

export const access_token = "access_token"
import * as Cookie from "js-cookie"
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '',password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentWillMount(){
    console.log("Login Mounted")
    if(Cookie.get(access_token)){
      window.location = '/user'
    }
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    const {loginError, postLogin} = this.props
    event.preventDefault();
    let email = this.state.email;
    let password = this.state.password ;
    postLogin(email,password);
  }


  render() {
    const {loginError, validLogin, fetching, fetched} = this.props

    let errorDiv = null
    let buttonDisabled = null
    if(fetching) {
      buttonDisabled = "disabled"
    }
    if(!fetching && !validLogin && loginError) {
      console.log(loginError)
      errorDiv = <div className="error-message-block">{loginError}</div>
    } else if(validLogin && fetched){
      console.log("Login success");
      window.location = "/user/"
    }

    return (
      <div>
        <div className="container login-header">
          <div className="row">
            <div className="col-sm-offset-1 col-sm-3 title-bar">
              <span className="title-text">facebook </span>
              <button type="button" className="btn btn-success btn-success-align">Sign up</button>
            </div>
          </div>
        </div>
        <div className="row login-form-div">
          <div className="col-sm-offset-3 col-sm-6 login-form">
            <div className="row">
              <div className="col-sm-offset-3 col-sm-6">
                <div className="login-header-text">
                  Log in to Facebook
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input type="email"  className="form-control input-radius" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" required/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control input-radius" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" required/>
                  </div>
                  {errorDiv}
                  <button id="loginBtn" type="submit" className={"btn btn-primary btn-block btn-login " + buttonDisabled}>Log In</button>
                  <div className="forget-password">
                    <a href="">Forgotten account? · Sign up for Facebook</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-offset-2 col-sm-8">
            <footer className="footer">This is footer content.</footer>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  validLogin : state.validate.validLogin,
  fetching : state.validate.fetching,
  fetched : state.validate.fetched,
  loginError : state.validate.error
})

const mapDispatchToProps = {postLogin}

Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default Login;