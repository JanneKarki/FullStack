import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

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
    }
    console.log('Button clicked', event.target)
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
          <p key={person.name} >{person.name}</p>
        )}
    </div>
  )

}

export default App