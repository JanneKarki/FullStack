import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Display = (props) => {
  return (
    <div>
      <b>{props.text} {props.counter}</b>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const header = 'Give feedback'
  const statistics = "Statistics"
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good +1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral +1)
  }
  const increaseBad = () => {
    setBad(bad +1)
  }

  return (
    <div>
      <h1>{header}</h1>
      <Button handleClick={increaseGood} text="Good" />
      <Button handleClick={increaseNeutral} text="Neutral" />
      <Button handleClick={increaseBad} text="Bad" />
      <h1>{statistics}</h1>
      <Display counter={good} text="good"/>
      <Display counter={neutral} text="neutral"/>
      <Display counter={bad} text="bad"/>

    </div>
  )
}

export default App