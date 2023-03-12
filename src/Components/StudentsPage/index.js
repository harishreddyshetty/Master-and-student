import {Component} from 'react'

import './index.css'

class StudentsPage extends Component {
  onClickLogout = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderQuestionsList = () => {
    const stringifiedList = localStorage.getItem('questionsList')
    const parsedList = JSON.parse(stringifiedList)
    console.log(parsedList)

    if (parsedList === null) {
      return <p>No questions to Show</p>
    }

    return (
      <ul className="questions-list-container">
        {parsedList.map(eachItem => {
          const {num1, num2, operator, id} = eachItem

          const onChangeAnswer = event => {
            const findIndex = parsedList.findIndex(
              eachQues => eachQues.id === id,
            )
            console.log(findIndex)
            parsedList[findIndex].studentAns = event.target.value
            localStorage.setItem('questionsList', JSON.stringify(parsedList))
          }

          return (
            <li className="question-item-list-stud" key={id}>
              <p>{num1}</p>
              <p>{operator}</p>
              <p>{num2}</p>
              <input
                onChange={onChangeAnswer}
                className="answer-input"
                type="text"
              />
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div>
        <nav className="nav-bar">
          <h1 className="student-heading">Students Home Page</h1>
          <button
            className="logout-btn"
            onClick={this.onClickLogout}
            type="button"
          >
            Logout
          </button>
        </nav>

        <div className="students-page">
          <img
            className="students-img"
            alt="students-img"
            src="https://res.cloudinary.com/drl5lt54o/image/upload/v1678606831/Master-Student/6463164_ryeqyp.jpg"
          />
          <div className="questions-container">
            <h1>Questions</h1>
            {this.renderQuestionsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default StudentsPage
