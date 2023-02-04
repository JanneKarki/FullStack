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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course} />
      <Content name={part1.name} value={part1.exercises} name2={part2.name} value2={part2.exercises} name3={part3.name} value3={part3.exercises3} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
    </div>
  )
}


export default App