import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    password: '',
  }

  componentDidMount() {}

  handleInputFields = (id, value) => {
    this.setState({
      [id]: value,
    })
  }

  onSubmission = async e => {
    e.preventDefault()
    const {history} = this.props
    const {userName, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          username: userName,
          password,
        }),
      })
      const response = await res.json()
      console.log(response)
      if (response.jwt_token) {
        Cookies.set('JWT', response.jwt_token, {expires: 7})
        history.push('/')
      } else {
        this.setState({
          errorMessage: response.error_msg,
        })
      }
    } catch (err) {
      throw new Error('Link might be incorrect')
    }
  }

  render() {
    const {userName, password, errorMessage} = this.state
    return (
      <div className="main__home">
        <form onSubmit={this.onSubmission}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="/"
          />
          <div>
            <label htmlFor="name">Username</label>
            <input
              onChange={e => {
                this.handleInputFields(e.target.id, e.target.value)
              }}
              placeholder="Enter input"
              id="userName"
              type="text"
              value={userName}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={e => {
                this.handleInputFields(e.target.id, e.target.value)
              }}
              placeholder="Enter input"
              id="password"
              type="password"
              value={password}
            />
          </div>
          <div>
            <button type="submit">Login</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
