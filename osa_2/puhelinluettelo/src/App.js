import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState('')
  
  function searchName(name) {
    return (
      persons.find(person => person.name === name)
    )
  }

  const addName = (event) => {
    event.preventDefault()
    if (searchName(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else{ 
      const nameObject = {
        name: newName,
        number: newNumber
    }
    console.log('Button clicked', event.target)
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
    setShowAll(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    
  }

  const namesToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) )


  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with: <input 
          value={newFilter}
          onChange={handleFilterChange}
          />

      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>  
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {namesToShow.map(person => 
          <p key={person.name} >{person.name} {person.number}</p>
        )}
    </div>
  )

}

export default App