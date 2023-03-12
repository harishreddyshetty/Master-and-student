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

  five = operator => (operator ? operator(5) : 5)

  renderQuestionsList = () => {
    // const stringifiedList = localStorage.getItem('questionsList')
    // const parsedList = JSON.parse(stringifiedList)
    const {questionsList} = this.state

    if (questionsList === []) {
      return <p>No question</p>
    }

    return (
      <ul>
        {questionsList.map(eachItem => {
          const {num1, num2, operator, id} = eachItem

          return (
            <li className="question-item-list" key={id}>
              <p>{num1}</p>
              <p>{operator}</p>
              <p>{num2}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {num1, num2, operator} = this.state

    return (
      <div>
        <div className="questionsContainer">
          <h1>Questions List</h1>
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
    )
  }
}

export default MastersPage
