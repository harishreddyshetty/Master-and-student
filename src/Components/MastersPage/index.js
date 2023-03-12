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

  plus = number => otherNumber => otherNumber + number

  getAnswer = num1 => num1

  getOperator = operator => operator

  renderQuestionsList = () => {
    const {questionsList} = this.state
    if (questionsList === []) {
      return <p>No question</p>
    }
    return (
      <ul className="questions-list-container-ms">
        {questionsList.map(eachItem => {
          const {num1, num2, operator, id, studentAns} = eachItem
          const answer = this.getAnswer(num1)
          const operatorValue = this.getOperator(operator)
          console.log(answer)
          console.log(operatorValue)

          const finalAnswer = this.getAnswer(num1)(
            this.getOperator(operator)(this.getAnswer(num2)()),
          )
          console.log(finalAnswer)

          return (
            <li className="question-item-list" key={id}>
              <p className="input-details">{num1}</p>
              <p className="input-details">{operator}</p>
              <p className="input-details">{num2}</p>

              {studentAns !== undefined && <p>{studentAns}</p>}
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
              <button onClick={this.addInput} type="button">
                Add
              </button>
            </div>
            {this.renderQuestionsList()}

            <button onClick={this.addToLocalStorage} type="button">
              Save
            </button>
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
