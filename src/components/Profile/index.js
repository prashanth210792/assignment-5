import './index.css'
// import Cookies from 'js-cookie'
// import {Component} from 'react'

// export class Profile extends Component {
//   state = {
//     profileDetails: {},
//   }

//   componentDidMount() {
//     this.fetchProfile()
//   }

//   fetchProfile = async () => {
//     const jwtToken = Cookies.get('jwt_token')
//     const url = 'https://apis.ccbp.in/profile'
//     const options = {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//       },
//     }

//     const response = await fetch(url, options)
//     const data = await response.json()

//     if (response.ok) {
//       const camelCasedData = {
//         name: data.profile_details.name,
//         profileImageUrl: data.profile_details.profile_image_url,
//         shortBio: data.profile_details.short_bio,
//       }
//       this.setState({profileDetails: camelCasedData})
//     }
//   }

//   render() {
//     const {profileDetails} = this.state
//     const {name, profileImageUrl, shortBio} = profileDetails
//     return (
//       <div className="profile-bg">
//         <img src={profileImageUrl} alt="profile" />
//         <h1>{name}</h1>
//         <p>{shortBio}</p>
//       </div>
//     )
//   }
// }

export const Profile = props => {
  const {details, profileFailedDetails, callApiProfile} = props
  const {name, profileImageUrl, shortBio} = details

  const clickedRetry = () => {
    callApiProfile()
  }
  return (
    <>
      {profileFailedDetails ? (
        <button type="button" onClick={clickedRetry}>
          Retry
        </button>
      ) : (
        <div className="profile-bg">
          <img src={profileImageUrl} alt="profile" />
          <h1>{name}</h1>
          <p>{shortBio}</p>
        </div>
      )}
    </>
  )
}
export default Profile
