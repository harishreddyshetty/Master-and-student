import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  // state = {masterLogin: false}

  mastersPage = () => {
    const {history} = this.props
    history.push('/masters-login')
  }

  studentsPage = () => {
    const {history} = this.props
    history.push('/students-login')
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-form-container">
          {/* <h1 className="heading">Login</h1> */}
          <h1 className="heading">Choose Account Type</h1>
          <div className="master-student-container">
            <div className="container">
              <img
                className="persons-img"
                alt="master"
                src="https://res.cloudinary.com/drl5lt54o/image/upload/v1678543833/Master-Student/presentation_tkoe9q.png"
              />
              <button
                className="master-student-btn"
                type="button"
                onClick={this.mastersPage}
              >
                Master
              </button>
            </div>

            <div className="container">
              <img
                className="persons-img"
                alt="student"
                src="https://res.cloudinary.com/drl5lt54o/image/upload/v1678544047/Master-Student/man_b9nyye.png"
              />
              <button
                className="master-student-btn"
                type="button"
                onClick={this.studentsPage}
              >
                Student
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
