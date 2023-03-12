import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import LoginForm from './Components/LoginForm'
import MasterLogin from './Components/MasterLogin'
import StudentLogin from './Components/StudentLogin'
import MastersPage from './Components/MastersPage'
import StudentsPage from './Components/StudentsPage'

// import Home from './components/Home'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/masters-login" component={MasterLogin} />
        <Route exact path="/students-login" component={StudentLogin} />
        <Route exact path="/master" component={MastersPage} />
        <Route exact path="/student" component={StudentsPage} />
      </Switch>
    )
  }
}

export default App
