import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {Header} from '../Header/index'
import {Profile} from '../Profile'
import {JobsItem} from '../JobsItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employementType: [],
    minimumPackage: 0,
    jobs: [],
    searchValue: '',
  }

  componentDidMount() {
    this.fetchJobs()
  }

  fetchJobs = async () => {
    const {employementType, minimumPackage, searchValue} = this.state
    const selectedEmpType = employementType.join(',')

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${selectedEmpType}&minimum_package=${minimumPackage}&search=${searchValue}`

    console.log(url)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    if (response.ok) {
      const camelCasedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobs: camelCasedData})
    }
  }

  selectEmploymentType = event => {
    const {employementType} = this.state

    const currentValue = event.target.value
    const isChecked = event.target.checked
    const updatedList = [...employementType, currentValue]
    if (isChecked) {
      this.setState({employementType: updatedList}, this.fetchJobs)
    } else {
      const filteredList = employementType.filter(each => each !== currentValue)
      this.setState({employementType: filteredList}, this.fetchJobs)
    }
  }

  employmentTypes = each => {
    const {label, employmentTypeId} = each

    return (
      <li key={employmentTypeId}>
        <input
          type="checkbox"
          value={employmentTypeId}
          onChange={this.selectEmploymentType}
        />
        <label>{label}</label>
      </li>
    )
  }

  selectSalaryRange = event => {
    this.setState({minimumPackage: event.target.value}, this.fetchJobs)
  }

  salaryRange = each => {
    const {label, salaryRangeId} = each

    return (
      <li key={salaryRangeId}>
        <input
          type="radio"
          value={salaryRangeId}
          onChange={this.selectSalaryRange}
          name="salary"
        />
        <label>{label}</label>
      </li>
    )
  }

  searchedJob = event => {
    this.setState({searchValue: event.target.value})
  }

  searchInputs = () => {
    this.fetchJobs()
  }

  render() {
    const {jobs, searchValue} = this.state
    const {employementType, minimumPackage} = this.state
    // console.log(employementType)
    // console.log(minimumPackage)

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-main-container">
          <div className="left-container">
            <Profile />
            <hr />
            <div>
              <h1>Type of Employment</h1>
              <ul className="ul-container">
                {employmentTypesList.map(each => this.employmentTypes(each))}
              </ul>
            </div>
            <hr />
            <div>
              <h1>Salary Range</h1>
              <ul className="ul-container">
                {salaryRangesList.map(each => this.salaryRange(each))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <input
              type="search"
              value={searchValue}
              onChange={this.searchedJob}
            />
            <button type="button" onClick={this.searchInputs}>
              search
            </button>
            {jobs.map(each => (
              <JobsItem details={each} key={each.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
