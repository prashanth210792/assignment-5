import './index.css'

export const SimilarJobsItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li className="li-similarJobItem">
      <img src={companyLogoUrl} alt="similar job company logo" />
      <h1>{title}</h1>
      <p>{rating}</p>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <p>{location}</p>
      <p>{employmentType}</p>
    </li>
  )
}
export default SimilarJobsItem
