import { useState, useEffect } from 'react'
import AddNew from './components/AddNew'
import Filter from './components/Filter'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState('')
  
  useEffect(() => {    
    console.log('effect')    
    axios      
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })  
    }, [])  
    console.log('render', persons.length, 'persons')
  
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
    axios
      .post('http://localhost:3001/persons', nameObject)
      .then(response => {
        console.log(response)
      })
    
      
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