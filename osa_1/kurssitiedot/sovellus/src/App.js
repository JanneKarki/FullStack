const Header = (header) => {
  return (
    <div>
      <h1>{header.name}</h1>
    </div>
  )
}

const Part = (data) => {
  return (
    <div>
      <p>
      {data.name} {data.value}
      </p>
    </div>

  )
}

const Content = (data) => {
  return (
    <div>
      <Part name={data.name} value={data.value}  />
      <Part name={data.name2} value={data.value2} />
      <Part name={data.name3} value={data.value3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course} />
      <Content name={part1} value={exercises1} name2={part2} value2={exercises2} name3={part3} value3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}


export default App