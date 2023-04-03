const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  .populate('user', {username : 1, name: 1, id: 1})
    response.status(200).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    response.status(200).json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
  return response.status(401).json({ error: 'token invalid' })
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (decodedToken.id !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'you cannot delete this blog' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  console.log(`${blogToDelete.title} deleted`)
  response.status(204).end()
  })


blogsRouter.put('/:id', async (request, response, next) => {
    const { id } = request.params;
    const { likes } = request.body;
  
    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true });
    response.status(201).json(updatedBlog);
    })

module.exports = blogsRouter;