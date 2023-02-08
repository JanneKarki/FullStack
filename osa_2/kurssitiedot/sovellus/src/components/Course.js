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
        {props.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
    )
  }
  
  const Total = ({props}) => {
    /*
    let sum = 0
    props.map(part => sum+= part.exercises)
    console.log(sum)
    */
    const total = props.reduce(function(s, p) {
      return s + p.exercises},
    0)
 
    return (
      <div>
         
        <b>total of {total} exercises </b>
      </div>
    )
  }
  
  const Course = ({course}) => {
    return ( 
      <div>
        <Header header={course} />
        <Content props={course.parts} />
        <Total props={course.parts} />
      </div>
    )
  }

  export default Course