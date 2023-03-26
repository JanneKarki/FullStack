const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
  })

describe('users get method', () => {
    test('users are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
  })
describe('Invalid inputs not accepted', () => {
    test('user with no username returns 400', async () => {
        const newUser = {
            name: 'Seppo Taalasmaa',
            username: '',
            password: 'asdfoi129823oklds',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(0)
    })
    test('user with no password returns 400', async () => {
        const newUser = {
            name: 'Seppo Taalasmaa',
            username: 'Talkkari',
            password: '',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(0)
    })
    test('username less than 3 characters returns 400', async () => {
        const newUser = {
            name: 'Seppo Taalasmaa',
            username: 'Aa',
            password: 'asdfoi129823oklds',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(0)
    })
    test('password less than 3 characters returns 400', async () => {
        const newUser = {
            name: 'Seppo Taalasmaa',
            username: 'Talkkari',
            password: 'as',
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(0)
    })

    test('creating a user with a non-unique username returns 400', async () => {
        const password = 'password123'
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            name: 'Seppo Taalasmaa',
            username: 'Talkkari',
            passwordHash,
        })
        await user.save()

        const newUser = new User({
            name: 'Seppo Taalasmaa',
            username: 'Talkkari',
            password,
        })

        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        const users = await User.find({})
        expect(users).toHaveLength(1)
    })
})
   
afterAll(async () => {
    await mongoose.connection.close()
})