import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
    const removeUrl = (`http://localhost:3001/persons/${id}`)
    axios.delete(removeUrl)
    console.log(`removed ${removeUrl}`)
    return axios.get(baseUrl)
  }
  
const update = (id, updatedObject) => {
  const url = `http://localhost:3001/persons/${id}`
 
  return axios.put(url, updatedObject)
}

export default { 
  getAll: getAll, 
  create: create,
  remove: remove, 
  update: update 
}