const _ = require('lodash')

const dummy = (blogs) => {
    // ...
    return 1
  }

const totalLikes = (blogs) => {
    let totalLikes = 0;
    for (let i = 0; i < blogs.length; i++) {
        totalLikes += blogs[i].likes;
    }
    return totalLikes;
}

function favoriteBlog(blogs) {
    let mostLikes = blogs[0].likes
    let favorite = blogs[0]

    if (blogs.length === 0) {
      return null
    }
    
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > mostLikes) {
        mostLikes = blogs[i].likes
        favorite = blogs[i]
      }
    }
    
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  }

function mostBlogs(blogs) {
    if (blogs.length === 0) {
      return null
    }
    const blogCounts = _.countBy(blogs, 'author')
    const mostWrittenBlogs = _.maxBy(_.keys(blogCounts), (author) => blogCounts[author])
    
    return {
      author: mostWrittenBlogs,
      blogs: blogCounts[mostWrittenBlogs]
    }
  }

function mostLikes(blogs) {
  if (blogs.length === 0) {
    return null
  }
  
  const likesByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.mapValues(likesByAuthor, (blogs) => _.sumBy(blogs, 'likes'))
  const mostLiked = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])
  
  return {
    author: mostLiked,
    likes: authorLikes[mostLiked]
  }
}

  

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }