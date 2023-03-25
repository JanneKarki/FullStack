const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('blogs get method', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
describe('Blogs id is defined', () => {
  test('blogs have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')
    const Blogs = response.body
    console.log(Blogs)
    Blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('Blogs Post request', () => {
  
  test('post a new blog creates new blog post', async () => {
    const testBlog = {
      title: 'Poetry',
      author: 'Arthur',
      url: 'https://poets.com',
      likes: 51
    }

    const currentBlogs = await api.get('/api/blogs')
    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(currentBlogs.body.length + 1)
    expect(updatedBlogs[updatedBlogs.length-1]).toMatchObject(testBlog)
  })

  test('missing likes is set to 0', async () => {
    const testBlog = {
      title: 'Poetry',
      author: 'Arthur',
      url: 'https://poets.com',
    }

    const response = await api.post('/api/blogs').send(testBlog).expect(201).expect('Content-Type', /application\/json/)

    const savedBlog = response.body
    expect(savedBlog.likes).toBeDefined()
    expect(savedBlog.likes).toBe(0)
  })

  test('responds 400 Bad Request when itle is missing', async () => {
    const newBlog = {
      author: 'Arthur',
      url: 'https://poets.com',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('responds 400 Bad Request when url is missing', async () => {
    const newBlog = {
      title: 'Poetry',
      author: 'Arthur',
      likes: 10
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      blogsAtStart.length - 1
    )
  
    const id = blogsAtEnd.map(r => r.id)
  
    expect(id).not.toContain(blogToDelete.id)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})