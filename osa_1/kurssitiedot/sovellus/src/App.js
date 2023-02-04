const Header = () => {
  const course = 'Half Stack application development'
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}


const Content = () => {
  const parts = [
    { name:'Fundamentals of react', exercises: 10},
    { name:'Using props to pass data', exercises: 7},
    { name:'State of component', exercises: 14}
  ]
  return (
    <div>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
      {parts[1].name} {parts[1].exercises}
      </p>
      <p>
      {parts[2].name} {parts[2].exercises}
      </p>
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