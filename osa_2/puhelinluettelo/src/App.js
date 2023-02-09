import { useState } from 'react'
import AddNew from './components/AddNew'
import Filter from './components/Filter'
import Persons from './components/Persons'

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
      <div>
       <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/> 
      </div>
      <AddNew
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  )

}

export default App