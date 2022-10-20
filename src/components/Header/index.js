import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

export const Header = props => {
  //   console.log(props)
  const logoutUser = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-bg-container">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </li>
      </Link>
      <li className="container">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
      </li>
      <li>pp</li>

      <button type="button" className="btn-logout" onClick={logoutUser}>
        Logout
      </button>
    </ul>
  )
}
export default withRouter(Header)
