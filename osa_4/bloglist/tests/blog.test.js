const listHelper = require('../utils/list_helper')
const { blogs } = require('../utils/test_blogs')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('totalLikes returns correct sum of likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('favoriteBlog returns most liked blog', () => {
    const favorite = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(favorite)
  })  
})

describe('most blogs', () => {
  test('mostBlogs returns author with most written blogs', () => {
    const mostBlogs = {
      author: "Robert C. Martin",
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostBlogs)
  })
})