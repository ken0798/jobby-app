import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Login from './components/Login'
import NotFound from './components/NotFound'
import CommonRoute from './components/Common/commonRoute'
import JobInfo from './components/JobInfo'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <CommonRoute exact path="/" component={Home} />
        <CommonRoute exact path="/jobs" component={Jobs} />
        <CommonRoute exact path="/jobs/:id" component={JobInfo} />
        <CommonRoute path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
