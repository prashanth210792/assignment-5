import './index.css'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'
import {Link, withRouter} from 'react-router-dom'

export const Header = props => {
  //   console.log(props)
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <div className="container">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </div>
      <button type="button" className="btn-logout" onClick={logoutUser}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
