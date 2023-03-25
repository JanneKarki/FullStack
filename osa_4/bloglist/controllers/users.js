const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        response.json(users)
      })
    console.log("users get toimiii")

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

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    //notes: body.notes
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