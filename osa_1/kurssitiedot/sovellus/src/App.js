const Header = (header) => {
  return (
    <div>
      <h1>{header.course}</h1>
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

const Content = ({props}) => {
  return (
    <div>
      <Part name={props[0].name} value={props[0].exercises}  />
      <Part name={props[1].name} value={props[1].exercises}  />
      <Part name={props[2].name} value={props[2].exercises}  />
    
    </div>
  )
}

const Total = ({props}) => {
  return (
    <div>

      <p>Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content props={parts} />
      <Total props={parts} />
          </div>
  )
}


export default App