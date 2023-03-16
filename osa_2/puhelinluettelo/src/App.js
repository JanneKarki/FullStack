import { useState, useEffect } from 'react'
import AddNew from './components/AddNew'
import Filter from './components/Filter'
import Persons from './components/Persons'
import nameService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  else {
    return (
      <div className='message'>
        {message}
      </div>
    )
  }
  
}
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  else {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
  
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState('')
  const [Message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {    

    console.log('effect')    
    nameService
    
      .getAll()
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
  function searchNameById(id) {
    for (const data in persons){
      if(persons[data].id === id ) {
        console.log(`Nimi löytyi ${persons[data].name}`)
        return persons[data].name
      }
    }
  }
  function searchIdByName(name) {
    for (const data in persons) {
      if (persons[data].name === name) {
        return persons[data].id
      }
    }
  }
  const addName = (event) => {
    event.preventDefault()
    if (searchName(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updateName()
      }
      
    } else{ 
      const nameObject = {
        name: newName,
        number: newNumber
      
    }
    console.log('Button clicked')
    nameService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
      
      

  }
  }
  const removeName = (id) => {
    const name = searchNameById(id)
    console.log(`remonveName called with  this id ${id}`)
    if (!name) {
      console.log(`Person with ID ${id} does not exist.`);
      return;
    }
       if ( window.confirm(`Poistetaanko ${name} luettelosta`)) {
    nameService
      .remove(id)
      .then(response => {
        console.log('Remove fulfilled')
        console.log(response.data)
        setPersons(response.data)
      })
      .catch(error => {
        setErrorMessage(`Information of ${name} has already been removed from the server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 4000);
      });
    }
  }
const updateName = () => {
  const id = searchIdByName(newName)
  nameService
    .update(id, {name: newName, number: newNumber})
    .then( response => {
      console.log("Updated")
      setPersons(persons.map(person => person.id !== id ? person : response.data))
      setMessage(`Updated ${newName}`)
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    })
    .catch(error => {
      setErrorMessage(`Information of ${newName} has already been removed from the server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    });
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

  const handleRemoveClick = (event) => {
    console.log(event.target.id)
    removeName(event.target.id)

  }

  const namesToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()) )



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <ErrorNotification message={errorMessage} />
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
      <Persons
      namesToShow={namesToShow}
      removeName={removeName}
      handleRemoveClick={handleRemoveClick}
       />
    </div>
  )

}

export default App