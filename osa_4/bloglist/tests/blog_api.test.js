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
    const Blogs = response.body.map(blog => blog.toJSON())
    Blogs.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})