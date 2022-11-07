import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import './index.css'
import Cookies from 'js-cookie'
import {Header} from '../Home'
import JobProfile from '../Common/jobProfileComponent'

// These are the lists used in the application. You can move them to any component needed.

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

// Replace your code here

class Jobs extends Component {
  state = {
    // jobs: [...employmentTypesList],
    // salary: [...salaryRangesList],
    profileData: '',
    employeeFilter: {
      FULLTIME: false,
      PARTTIME: false,
      FREELANCE: false,
      INTERNSHIP: false,
    },
    paramFilter: [],
    wageFilter: '',
    searchFilter: '',
    jobsData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('JWT')
    const response = await fetch('https://apis.ccbp.in/profile', {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    const resJson = await response.json()
    let profileData = resJson.profile_details
    profileData = {
      name: profileData.name,
      imgUrl: profileData.profile_image_url,
      bio: profileData.short_bio,
    }
    this.setState({
      profileData,
      isLoading: false,
    })
  }

  getJobsData = async () => {
    this.setState({
      isLoading: true,
    })
    const {paramFilter, wageFilter, searchFilter} = this.state
    const jwtToken = Cookies.get('JWT')
    let url = 'https://apis.ccbp.in/jobs?'
    if (
      paramFilter.length > 0 &&
      wageFilter.length !== 0 &&
      searchFilter.length !== 0
    ) {
      url += `employment_type=${paramFilter}&minimum_package=${wageFilter}&search=${searchFilter}`
    } else if (wageFilter.length !== 0) {
      url += `minimum_package=${wageFilter}`
    } else if (paramFilter.length > 0) {
      url += `employment_type=${paramFilter}`
    } else {
      url += `search=${searchFilter}`
    }
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      const data = await res.json()
      const {jobs} = data
      setTimeout(() => {
        this.setState({
          isLoading: false,
        })
      }, 1000)
      this.setState({
        jobsData: jobs.map(item => ({
          id: item.id,
          title: item.title,
          rating: item.rating,
          location: item.location,
          companyLogoUrl: item.company_logo_url,
          jobDescription: item.job_description,
          employmentType: item.employment_type,
          packagePerAnnum: item.package_per_annum,
        })),
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  handleToggleEmployeeFields = (id, booly) => {
    this.setState(
      pre => ({
        employeeFilter: {
          ...pre.employeeFilter,
          [id]: booly,
        },
      }),
      () => {
        this.onParamFilter(id)
        this.getJobsData()
      },
    )
  }

  handleToggleWageFields = value => {
    this.setState(
      {
        wageFilter: value,
      },
      () => {
        this.getJobsData()
      },
    )
  }

  onParamFilter = id => {
    const {employeeFilter, paramFilter} = this.state
    const index = paramFilter.indexOf(id)
    if (employeeFilter[id]) {
      paramFilter.push(id)
    } else if (index > -1) {
      paramFilter.splice(index, 1)
    }
    this.setState({
      paramFilter,
    })
  }

  onFilterSearch = title => {
    this.setState(
      {
        searchFilter: title,
      },
      () => {
        this.getJobsData()
      },
    )
  }

  render() {
    const {profileData, searchFilter, isLoading, jobsData} = this.state
    return (
      <div className="home__container">
        <Header props={this.props} />
        <section className="main_job">
          <div className="job_container">
            <SideBar
              profileData={profileData}
              isLoading={isLoading}
              handleToggleEmployeeFields={this.handleToggleEmployeeFields}
              handleToggleWageFields={this.handleToggleWageFields}
              onParamFilter={this.onParamFilter}
            />
            <JobComponent
              isLoading={isLoading}
              searchFilter={searchFilter}
              onFilterSearch={this.onFilterSearch}
              jobsData={jobsData}
            />
          </div>
        </section>
      </div>
    )
  }
}

function SideBar(args) {
  const {
    profileData,
    isLoading,
    handleToggleEmployeeFields,
    handleToggleWageFields,
  } = args
  return (
    <div className="side_card">
      <div className="pro_bg">
        {isLoading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <>
            <img src={profileData.imgUrl} alt="/" />
            <h1>{profileData.name}</h1>
            <p>{profileData.bio}</p>
          </>
        )}
      </div>
      <hr />
      <div className="check-box">
        <h3>Type of Employees</h3>
        <ul>
          {employmentTypesList.map(item => (
            <li key={item.employmentTypeId}>
              <input
                id={item.employmentTypeId}
                type="checkbox"
                onChange={e => {
                  handleToggleEmployeeFields(
                    item.employmentTypeId,
                    e.target.checked,
                  )
                }}
              />
              <label htmlFor={item.employmentTypeId}>{item.label}</label>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className="check-box">
        <h3>Salary Range</h3>
        <ul>
          {salaryRangesList.map(salary => (
            <li key={salary.salaryRangeId}>
              <input
                id={salary.salaryRangeId}
                name="salary"
                type="radio"
                onChange={() => {
                  handleToggleWageFields(salary.salaryRangeId)
                }}
              />
              <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function JobComponent({jobsData, isLoading, searchFilter, onFilterSearch}) {
  return (
    <div className="browse-jobs">
      <div className="field-search">
        <input
          onChange={e => {
            const searchKey = e.target.value
            onFilterSearch(searchKey)
          }}
          value={searchFilter}
          type="search"
          placeholder="Search"
        />
        <div>
          <AiOutlineSearch className="r-icon" />
        </div>
      </div>
      {isLoading ? (
        <div className="loader-container">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      ) : (
        <>
          <div className="job-lists">
            {jobsData?.map(job => (
              <Link
                style={{textDecoration: 'none'}}
                key={job.id}
                to={`/jobs/${job.id}`}
              >
                <div className="job-card">
                  <JobProfile job={job} />
                </div>
              </Link>
            ))}
          </div>
          {jobsData?.length === 0 && (
            <div className="no-jobs">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="/"
              />
              <h3>No Jobs Found</h3>
              <p>
                We couldn&lsquo;t find any jobs please look out other filter
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Jobs
