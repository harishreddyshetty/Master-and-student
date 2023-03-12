import {Component} from 'react'

import './index.css'

class StudentsPage extends Component {
  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
  }

  renderQuestionsList = () => {
    const stringifiedList = localStorage.getItem('questionsList')
    const parsedList = JSON.parse(stringifiedList)
    console.log(parsedList)

    if (parsedList === null) {
      return <p>No questions to Show</p>
    }

    return (
      <ul>
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
            <li className="question-item-list" key={id}>
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
        <nav>
          <div>
            <h1>Students Home Page</h1>
            <button onClick={this.onClickLogout} type="button">
              Logout
            </button>
          </div>
        </nav>

        <div>
          <h1>Questions</h1>
          {this.renderQuestionsList()}
        </div>
      </div>
    )
  }
}

export default StudentsPage
