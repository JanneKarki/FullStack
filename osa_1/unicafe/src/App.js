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
      <b>{props.text} {props.value} {props.unit}</b>
    </div>
  )
}


const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = good + neutral + bad
  const score = good - bad
  const positive = (good/total)*100
  const average = score/total
  return (
    <div>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={total} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive} unit="%"/>
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
     
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App