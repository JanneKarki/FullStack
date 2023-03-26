const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
        response.json(users)
      })

/*
usersRouter.get('/:id', (request, response, next) => {
  User.findById(request.params.id)
    .then(user => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
*/
usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username and password must be provided' })
  }
  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }
  const existingUser = await User.findOne({ username: body.username })
  if (existingUser) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: body.blogs
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})


//usersRouter.delete('/:id', async (request, response) => {
//    await User.findByIdAndRemove(request.params.id)
//    response.status(204).end()
//  })


//usersRouter.put('/:id', async (request, response, next) => {
//    const { id } = request.params;
//    const { likes } = request.body;
//  
//    const updatedUser = await User.findByIdAndUpdate(id, { likes }, { new: true });
//    response.status(201).json(updatedUser);
//    })

module.exports = usersRouter;