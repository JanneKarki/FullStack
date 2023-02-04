const Header = (header) => {
  return (
    <div>
      <h1>{header.name}</h1>
    </div>
  )
}

const Part = (name, exercises) => {
  return (
    <div>
      <p>
      {name} {exercises}
      </p>
    </div>

  )
}

const Content = (part1, exercises1, part2, exercises2, part3, exercises3) => {
  return (
    <div>
      <Part name={part1} exercises={exercises1} />
      <Part name={part2} exercises={exercises2} />
      <Part name={part3} exercises={exercises3} />
    </div>
  )
}

const App = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={part1} />
      
      
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}


export default App