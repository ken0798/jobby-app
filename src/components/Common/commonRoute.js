import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

function CommonRoute(props) {
  const jwt = Cookies.get('JWT')
  if (!jwt) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default CommonRoute
