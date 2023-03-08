import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
    const removeUrl = (`${baseUrl}/${id}`)
    console.log(`removed ${removeUrl}`)
    return axios.delete(removeUrl)
    .then(() => {
      console.log(`removed ${removeUrl}`)
      return axios.get(baseUrl)
    })
    .catch(error => {
        console.log("fail")
        throw error
    })
    
}

  
const update = (id, updatedObject) => {
  const url = `${baseUrl}/${id}`
 
  return axios.put(url, updatedObject)
}

export default { 
  getAll: getAll, 
  create: create,
  remove: remove, 
  update: update 
}