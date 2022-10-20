import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  changeUserName = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = token => {
    console.log(token)
    Cookies.set('jwt_token', token, {expires: 2})
    this.setState({errorMsg: ''})
    const {history} = this.props
    history.replace('/')
  }

  fetchLogin = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data)
      this.setState({errorMsg: data.error_msg})
    }
  }

  submitForm = event => {
    event.preventDefault()
    this.fetchLogin()
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <label htmlFor="username">USERNAME</label>
            <br />
            <input
              type="text"
              id="username"
              className="input-container"
              placeholder="username"
              value={username}
              onChange={this.changeUserName}
            />
            <br />
            <label htmlFor="password">PASSWORD</label>
            <br />
            <input
              type="password"
              id="password"
              className="input-container"
              placeholder="password"
              value={password}
              onChange={this.changePassword}
            />
            <br />
            <p>{errorMsg}</p>
            <button type="submit" className="btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
