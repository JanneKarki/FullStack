import { useState, useEffect } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text }
    </button>
  )
}

const Votes = (props) => {
  return (
    <p>has {props.votes} votes</p>
  )
}

const Anecdotes = (props) => {
  return (
    <p>{props.anecdote}</p>
  )
}

const MostVoted = (props) => {
  const sum = props.votes.reduce((acc, val) => acc + val, 0);
  const max = Math.max(...props.votes)
  if (sum === 0) {
    return null
  } else {
    return (
      <div>
      <p>{props.anecdotes}</p>
      <p>has {max} votes</p>
      </div>
    )
  }
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])
  const [mostVoted, setMostVoted] = useState(0)

  const randomSelection = () => {
    const number = Math.floor(Math.random() * 8)
    setSelected(number)
  }
  
  function handleVoteClick() {
    let copy = [...votes]
    copy[selected] += 1 
    setVotes(copy)
    console.log(votes)
    setMostVoted(findIndexOfLargest)
  }

  function findIndexOfLargest() {
    console.log("function called")
    let max = votes[0];
    let index = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        index = i;
      }
    }
    return index;
  }
  useEffect(() => {
    console.log("Selected:", selected);
  }, [selected]);
  

  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]}/>
      <Votes votes={votes[selected]} />
      <Button handleClick={handleVoteClick} text="vote" /> 
      <Button handleClick={randomSelection} text="next anecdote" />
      <MostVoted anecdotes={anecdotes[mostVoted]} votes={votes}/>
    </div>
  )
}

export default App
