import {Header} from '../Home'

import './index.css'

function NotFound(props) {
  return (
    <div className="home__container">
      <Header props={props} />
      <div className="error_img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png   "
          alt="not found"
        />
        <h1>Page Not Found</h1>
        <p>We&lsquo;re sorry, the page you requested could not be found</p>
      </div>
    </div>
  )
}

export default NotFound
