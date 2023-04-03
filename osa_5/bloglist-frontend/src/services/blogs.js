import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const config = {
    headers: { Authorization: token},
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token},
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    console.log(`New blog added`)
    return response.data
  } catch (error) {
    console.error(error) // log the full error object
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }