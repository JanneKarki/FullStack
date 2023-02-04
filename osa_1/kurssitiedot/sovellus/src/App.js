const Header = () => {
  const course = 'Half Stack application development'
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Part1 = () => {
  const name = 'Fundamentals of react'
  const exercises = 10
  return (
    <div>
      <p>
      {name} {exercises}
      </p>
    </div>

  )
}

const Part2 = () => {
  const name = 'Using props to pass data'
  const exercises = 7
  return (
    <div>
      <p>
      {name} {exercises}
      </p>
    </div>

  )
}
const Part3 = () => {
  const name = 'State of component'
  const exercises = 14
  return (
    <div>
      <p>
      {name} {exercises}
      </p>
    </div>

  )
}
const Content = () => {
  return (
    <div>
      <Part1 />
      <Part2 />
      <Part3 />
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
      <Header />
      <Content />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}


export default App