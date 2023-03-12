import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

class MasterLogin extends Component {
  state = {
    username: '',
    password: '',
    loginSuccess: true,
    loginClicked: true,
    signUpClicked: false,
  }

  clickedLogin = () => {
    this.setState(prevState => ({
      loginClicked: !prevState.loginClicked,
      signUpClicked: !prevState.signUpClicked,
      username: '',
      password: '',
    }))
  }

  clickedSignup = () => {
    this.setState(prevState => ({
      signUpClicked: !prevState.signUpClicked,
      loginClicked: !prevState.loginClicked,
      username: '',
      password: '',
    }))
  }

  onSuccessLogin = () => {
    const {history} = this.props
    history.replace('/master')
  }

  onClickLogin = event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = Cookie.get('master_details')

    let details = {}
    if (userDetails === undefined) {
      this.setState({loginSuccess: false})
    } else {
      details = JSON.parse(userDetails)
    }

    if (username === details.username && password === details.password) {
      this.onSuccessLogin()
    } else {
      this.setState({loginSuccess: false})
    }
  }

  onClickSignup = event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = JSON.stringify({username, password})
    Cookie.set('master_details', userDetails)
    this.setState({username: '', password: ''})
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  renderSignup = () => {
    const {username, password} = this.state

    return (
      <div className="login-container">
        <h1 className="login-heading">Sign up</h1>
        <form className="login-form" onSubmit={this.onClickSignup}>
          <label className="labels" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input-element"
            placeholder="Username"
            onChange={this.updateUsername}
            value={username}
            id="username"
            type="text"
          />
          <label className="labels" htmlFor="password">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            className="input-element"
            onChange={this.updatePassword}
            value={password}
            id="password"
            type="password"
          />
          <button className="login-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    )
  }

  renderLogin = () => {
    const {username, password, loginSuccess} = this.state

    return (
      <div className="login-container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form" onSubmit={this.onClickLogin}>
          <label className="labels" htmlFor="username">
            USERNAME
          </label>
          <input
            className="input-element"
            placeholder="Username"
            onChange={this.updateUsername}
            value={username}
            id="username"
            type="text"
          />
          <label className="labels" htmlFor="password">
            PASSWORD
          </label>
          <input
            placeholder="Password"
            className="input-element"
            onChange={this.updatePassword}
            value={password}
            id="password"
            type="password"
          />
          <button className="login-btn" type="submit">
            Login
          </button>

          {loginSuccess ? null : <p>*Username and password didnt Match</p>}
        </form>
      </div>
    )
  }

  render() {
    const {loginClicked, signUpClicked} = this.state

    return (
      <div className="login-signup">
        {loginClicked ? (
          this.renderLogin()
        ) : (
          <div className="signUp-login-btn-container">
            <h1 className="signUp-login-description">Login to get Access</h1>
            <button
              className="signUp-login-btn"
              onClick={this.clickedLogin}
              type="button"
            >
              Login
            </button>
          </div>
        )}

        {signUpClicked ? (
          this.renderSignup()
        ) : (
          <div className="signUp-login-btn-container">
            <h1 className="signUp-login-description">Not a user ?</h1>
            <button
              className="signUp-login-btn"
              onClick={this.clickedSignup}
              type="button"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default MasterLogin
