import './index.css'
import {Link} from 'react-router-dom'

export const JobsItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details
  return (
    <Link to={`/jobs/${id}`}>
      <div className="jobItem-bg-container">
        <img className="logo" src={companyLogoUrl} alt="company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{location}</p>
        <p>{employmentType}</p>
        <p>{packagePerAnnum}</p>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}
export default JobsItem
