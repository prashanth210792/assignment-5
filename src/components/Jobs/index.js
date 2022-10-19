import './index.css'
import {Component} from 'react'
import {Header} from '../Header/index'

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
  }

  profile = () => (
    <div className="profile-bg">
      <h1>Rahul Athuluri</h1>
      <p>Lead Software Engineer</p>
    </div>
  )

  selectEmploymentType = event => {
    const {employementType} = this.state

    const currentValue = event.target.value
    const isChecked = event.target.checked
    const updatedList = [...employementType, currentValue]
    if (isChecked) {
      this.setState({employementType: updatedList})
    } else {
      const filteredList = employementType.filter(each => each !== currentValue)
      this.setState({employementType: filteredList})
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
    this.setState({minimumPackage: event.target.value})
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

  render() {
    // const {employementType, minimumPackage} = this.state
    // console.log(employementType)
    // console.log(minimumPackage)

    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-main-container">
          <div className="left-container">
            {this.profile()}
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
            <input type="search" />
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
