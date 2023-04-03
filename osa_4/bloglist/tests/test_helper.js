const Blog = require('../models/blog')


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const testBlog = {
        title: 'Poetry',
        author: 'Arthur',
        url: 'https://poets.com',
        likes: 51,
        
      }


module.exports = {
    blogsInDb,
    testBlog
  }