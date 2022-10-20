import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'

class JobItemDetails extends Component {
  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok) {
      console.log(data)
    }
  }

  render() {
    return (
      <div>
        <p>ooo</p>
      </div>
    )
  }
}
export default JobItemDetails
