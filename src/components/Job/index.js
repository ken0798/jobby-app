import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {FiExternalLink} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import {Header} from '../Home'

import JobProfile from '../Common/jobProfileComponent'
import './index.css'

class Job extends Component {
  state = {
    jobProfile: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getSpecificJob()
  }

  getSpecificJob = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('JWT')
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    const data = await res.json()
    const jobDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      skills: data.job_details.skills.map(item => ({
        imageUrl: item.image_url,
        name: item.name,
      })),
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
    }
    const similarJobs = data.similar_jobs.map(item => ({
      companyLogoUrl: item.company_logo_url,
      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      rating: item.rating,
      title: item.title,
    }))
    const jobProfile = {
      jobDetails,
      similarJobs,
    }
    this.setState({
      jobProfile,
      isLoading: false,
    })
  }

  render() {
    const {jobProfile, isLoading} = this.state
    const {similarJobs} = jobProfile
    return (
      <div className="home__container">
        <Header props={this.props} />
        {isLoading ? (
          <div className="loader-container">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <section className="main_job">
            <div className="main_container">
              <JobContainer profile={jobProfile} />
              <h1>Similar Jobs</h1>
              <ul>
                {similarJobs.map(job => (
                  <li key={job.id} className="similar_card">
                    <div className="company-card">
                      <img src={job.companyLogoUrl} alt="/" />
                      <div>
                        <h3>{job.title}</h3>
                        <div>
                          <AiFillStar className="star-icon" />
                          <span>{job.rating}</span>
                        </div>
                      </div>
                    </div>
                    <h3>Description</h3>
                    <p>{job.jobDescription}</p>
                    <div className="similar_area">
                      <div>
                        <ImLocation />
                        <span>{job.location}</span>
                      </div>
                      <div>
                        <BsFillBriefcaseFill />
                        <span>{job.employmentType}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    )
  }
}

function JobContainer({profile}) {
  const {jobDetails} = profile
  return (
    <section className="profile-container">
      <JobProfile job={jobDetails} />
      <div className="link_site">
        <a
          style={{color: '#b6c5ff', textDecoration: 'none'}}
          href={jobDetails.companyWebsiteUrl}
        >
          Visit
        </a>
        <FiExternalLink style={{color: '#b6c5ff'}} />
      </div>

      <h3>Skills</h3>
      <ul>
        {jobDetails?.skills.map(skill => (
          <li key={skill.name}>
            <img src={skill.imageUrl} alt="/" />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
      <h3>Life at Company</h3>
      <div className="company-figure">
        <p>{jobDetails?.lifeAtCompany.description}</p>
        <img src={jobDetails?.lifeAtCompany.imageUrl} alt="/" />
      </div>
    </section>
  )
}

export default Job
