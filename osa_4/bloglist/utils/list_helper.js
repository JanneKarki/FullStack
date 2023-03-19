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
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
  }