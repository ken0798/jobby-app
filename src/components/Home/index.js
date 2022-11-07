import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

function Home(props) {
  const {history} = props
  return (
    <>
      <div className="home__container">
        <Header props={props} />
        <Content history={history} />
      </div>
    </>
  )
}

export function Header({props}) {
  return (
    <div className="home__layer">
      <header>
        <img
          style={{cursor: 'pointer'}}
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="/"
          onClick={() => props.history.push('/')}
        />
        <ul>
          <Link className="list" to="/">
            <li>Home</li>
          </Link>
          <Link className="list" to="/jobs">
            <li>Jobs</li>
          </Link>
        </ul>
        <button
          onClick={() => {
            Cookies.remove('JWT')
            props.history.push('/login')
          }}
          className="header__btn"
          type="button"
        >
          Logout
        </button>
      </header>
    </div>
  )
}

function Content({history}) {
  return (
    <div className="sec_info">
      <section className="content__info">
        <h1>Find The Job That Fits Your Life</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla
          facilisi etiam dignissim diam quis enim lobortis scelerisque.
        </p>
        <button
          onClick={() => history.push('/jobs')}
          className="header__btn"
          type="button"
        >
          Find Jobs
        </button>
      </section>
    </div>
  )
}

export default Home
