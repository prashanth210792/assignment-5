import './index.css'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import {Header} from '../Header'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  const findJobs = () => {
    const {history} = props
    history.replace('/jobs')
    //   <Redirect to="/jobs" />
  }

  return (
    <div className="home-container">
      <Header />
      <div>
        <h1>Find the Job That Fits Your Life</h1>
        <p>Millions of people are searching for job</p>
        <button type="button" className="btn-find-job" onClick={findJobs}>
          Find Jobs
        </button>
      </div>
    </div>
  )
}

export default Home
