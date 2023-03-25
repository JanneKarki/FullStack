const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

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
  
    const response = (await api.get('/api/blogs'))
    const updatedBlogs = response.body
    expect(updatedBlogs).toHaveLength(currentBlogs.body.length + 1)

    expect(updatedBlogs[updatedBlogs.length-1]).toMatchObject(testBlog)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})