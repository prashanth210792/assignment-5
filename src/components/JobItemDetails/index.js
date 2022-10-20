import './index.css'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import {Skills} from '../Skills'
import {Header} from '../Header'
import {SimilarJobsItem} from '../SimilarJobsItem'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failed: 'FAILED',
  inProgress: 'INPROGRESS',
}
class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusList.inProgress,
    // isLoading: true,
  }

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
    console.log(data)

    if (response.ok) {
      //   console.log(data)

      const camelCasedSkill = camelData => {
        const result = camelData.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        }))
        return result
      }

      const camelCaseLifeAtCompany = camelData => ({
        description: camelData.description,
        imageUrl: camelData.image_url,
      })

      const camelCasedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: camelCaseLifeAtCompany(data.job_details.life_at_company),
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: camelCasedSkill(data.job_details.skills),
        title: data.job_details.title,
      }

      const camelCasedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: camelCasedJobDetails,
        similarJobs: camelCasedSimilarJobs,
        apiStatus: apiStatusList.success,
        // isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failed})
    }

    if (data.status_code === 401) {
      const {history} = this.props
      history.replace('/login')
    }
  }

  descriptionArea = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      //   id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <Header />

        <div className="jobDetails-bg-container">
          <div className="jobItem-bg-container">
            <img
              className="logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <h1>{title}</h1>
            <p>{rating}</p>
            <p>{location}</p>
            <p>{employmentType}</p>
            <p>{packagePerAnnum}</p>
            <hr />
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
            <p>{jobDescription}</p>
            <h1>Skills</h1>
            <ul className="ul-jobDetails">
              {skills.map(each => (
                <Skills details={each} key={each.name} />
              ))}
            </ul>
            <h1>Life at Company</h1>
            <div>
              <p>{description}</p>
              <img src={imageUrl} alt="life at company" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  similarJobs = () => {
    const {similarJobs} = this.state
    return (
      <ul className="ul-jobItemDetails">
        {similarJobs.map(each => (
          <SimilarJobsItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>

      <button type="button" onClick={this.fetchDetails}>
        Retry
      </button>
    </div>
  )

  loading = () => (
    <div testid="loader">
      {/* <div> */}
      <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusList.inProgress:
        return this.loading()

      case apiStatusList.success:
        return (
          <div>
            {this.descriptionArea()}
            <h1>Similar Jobs</h1>
            {this.similarJobs()}
          </div>
        )
      case apiStatusList.failed:
        return this.failureView()
      default:
        return null
    }
  }
}
export default JobItemDetails
