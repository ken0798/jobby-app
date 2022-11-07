import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Switch} from 'react-router-dom'
import Job from './components/Job'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Login from './components/Login'
import NotFound from './components/NotFound'
import CommonRoute from './components/Common/commonRoute'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Login exact path="/login" component={Login} />
        <CommonRoute exact path="/" component={Home} />
        <CommonRoute exact path="/jobs" component={Jobs} />
        <CommonRoute exact path="/jobs/:id" component={Job} />
        <CommonRoute path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
