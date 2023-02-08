const Header = ({header}) => {
    return (
      <div>
        <h1>{header.name}</h1>
      </div>
    )
  }
  

  const Content = ({props}) => {
    return (
      <div>
        {props.map(part => <p>{part.name} {part.exercises}</p>)}
      </div>
    )
  }
  /*
  const Total = ({props}) => {
    return (
      <div>
  
        <p>Number of exercises {props[0].exercises + props[1].exercises + props[2].exercises}</p>
      </div>
    )
  }
  */
  const Course = ({course}) => {
    return ( 
      <div>
        <Header header={course} />
        <Content props={course.parts} />
       
      </div>
    )
  }

  export default Course