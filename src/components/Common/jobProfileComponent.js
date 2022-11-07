import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'

function JobProfile(params) {
  const {job} = params
  return (
    <>
      <div className="company-card">
        <img src={job?.companyLogoUrl} alt="/" />
        <div>
          <h4>{job?.title}</h4>
          <div>
            <AiFillStar className="star-icon" />
            <span>{job?.rating}</span>
          </div>
        </div>
      </div>
      <div className="zip-area">
        <div>
          <div>
            <ImLocation />
            <span>{job?.location}</span>
          </div>
          <div>
            <BsFillBriefcaseFill />
            <span>{job?.employmentType}</span>
          </div>
        </div>
        <span>{job?.packagePerAnnum}</span>
      </div>
      <hr />
      <h3>Description</h3>
      <p>{job?.jobDescription}</p>
    </>
  )
}

export default JobProfile
