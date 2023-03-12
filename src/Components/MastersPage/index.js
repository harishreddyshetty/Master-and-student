import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

// import Cookie from 'js-cookie'
import './index.css'

class MastersPage extends Component {
  state = {num1: '', num2: '', operator: '', questionsList: []}

  componentDidMount() {
    const stringifiedList = localStorage.getItem('questionsList')
    const parsedList = JSON.parse(stringifiedList)
    if (parsedList === null) {
      this.setState({questionsList: []})
    } else {
      this.setState({questionsList: parsedList})
    }
  }

  addToLocalStorage = () => {
    const {questionsList} = this.state
    localStorage.setItem('questionsList', JSON.stringify(questionsList))
  }

  addInput = () => {
    const {num1, num2, operator} = this.state
    const id = uuidv4()
    const question = {id, num1, num2, operator}
    const stringifiedList = localStorage.getItem('questionsList')
    const parsedList = JSON.parse(stringifiedList)
    console.log(parsedList)
    if (parsedList === null) {
      this.setState(prevState => ({
        questionsList: [...prevState.questionsList, question],
        num1: '',
        num2: '',
        operator: '',
      }))
    } else {
      this.setState({
        questionsList: [...parsedList, question],
        num1: '',
        num2: '',
        operator: '',
      })
    }
  }

  onChangeNum1 = event => {
    this.setState({num1: event.target.value})
  }

  onChangeNum2 = event => {
    this.setState({num2: event.target.value})
  }

  onChangeOperator = event => {
    this.setState({operator: event.target.value})
  }

  zero = operator => (operator ? operator(0) : 0)

  one = operator => (operator ? operator(1) : 1)

  plus = number => otherNumber => otherNumber + number

  getNumber = num1 => {
    switch (num1) {
      case 'zero':
        return 0
      case 'one':
        return 1
      case 'two':
        return 2
      case 'three':
        return 3
      case 'four':
        return 4
      case 'five':
        return 5
      case 'six':
        return 6
      case 'seven':
        return 7
      case 'eight':
        return 8
      case 'nine':
        return 9
      default:
        return null
    }
  }

  getAnswer = (number1, number2, operatorValue) => {
    switch (operatorValue) {
      case 'plus':
        return number1 + number2
      case 'minus':
        return number1 - number2
      case 'times':
        return number1 * number2
      case 'dividedBy':
        return Math.round(number1 / number2)

      default:
        return null
    }
  }

  renderQuestionsList = () => {
    const {questionsList} = this.state

    return (
      <ul className="questions-list-container-ms">
        {questionsList.map(eachItem => {
          const {num1, num2, operator, id, studentAns} = eachItem
          const number1 = this.getNumber(num1)
          const number2 = this.getNumber(num2)
          const answer = this.getAnswer(number1, number2, operator)

          return (
            <li className="question-item-list" key={id}>
              <p className="input-details">{num1}</p>
              <p className="input-details">{operator}</p>
              <p className="input-details">{num2}</p>
              <p className="answer">{answer}</p>
              {studentAns !== undefined && (
                <p className="std-ans">{studentAns}</p>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {num1, num2, operator} = this.state

    return (
      <div>
        <nav className="nav-bar">
          <h1 className="master-page-heading">Masters Home Page</h1>
          <button
            className="logout-btn"
            onClick={this.onClickLogout}
            type="button"
          >
            Logout
          </button>
        </nav>

        <div className="questionsContainer">
          <img
            className="teachers-img"
            alt="teachers-img"
            src="https://res.cloudinary.com/drl5lt54o/image/upload/v1678605541/Master-Student/3670301_w4mmzk.jpg"
          />
          <div className="masters-questions-container">
            <h1 className="master-pageQuestion-heading">Questions List</h1>
            <div className="question-input-container">
              <div className="input-element-container">
                <label className="label-heading" htmlFor="number1">
                  Number
                </label>
                <input
                  value={num1}
                  onChange={this.onChangeNum1}
                  className="number-input"
                  id="number1"
                  type="text"
                />
              </div>

              <div className="input-element-container">
                <label className="label-heading" htmlFor="number1">
                  Operator
                </label>
                <input
                  onChange={this.onChangeOperator}
                  value={operator}
                  className="operator-input"
                  id="operator"
                  type="text"
                />
              </div>

              <div className="input-element-container">
                <label className="label-heading" htmlFor="number2">
                  Number
                </label>
                <input
                  onChange={this.onChangeNum2}
                  value={num2}
                  className="number-input"
                  id="number2"
                  type="text"
                />
              </div>
              <button className="btn" onClick={this.addInput} type="button">
                Add
              </button>
            </div>
            <div className="answers-heading-container">
              <p className="answer-heading">Ans</p>
              <p className="answer-heading">s-Ans</p>
            </div>
            {this.renderQuestionsList()}
            <div className="btn-container">
              <button
                className="save-btn"
                onClick={this.addToLocalStorage}
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MastersPage

//  const answer = this.getNumber(num1)(
//             this.getOperator(operator)(this.getNumber(num2)),
//           )

//  const number1 = this.getAnswer(num1)
//           const number2 = this.getAnswer(num2)
//           const operatorValue = this.getOperator(operator)

//           const finalAnswer = {number1}({operatorValue}({number2}()))
//           console.log(finalAnswer)
