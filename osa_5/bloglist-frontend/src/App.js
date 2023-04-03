import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import{ ErrorNotification, Notification } from './components/Notifications'
import './index.css'
import AddNew from './components/AddNew'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

/*  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
*/
  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [])
  const addBlog = async (event) => {
    event.preventDefault()
  
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
  
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => {
        setMessage(null)
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
      }, 4000)
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
    <h2>log in to application</h2>
      username
      <input
      type="username"
      value={username}
      name="username"
      onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
      type="password"
      value={password}
      name="password"
      onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const blogForm = () => (
    <div>
       <h2>create new</h2>
       <AddNew
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
  )

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={message} />
      {!user && loginForm()}
      {user && <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button type="submit" onClick={handleLogout}> logout</button>
        </p>
        {blogForm()}
        
        </div>

      }
    </div>
  )
}

export default App