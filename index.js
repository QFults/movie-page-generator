const prompt = require('inquirer').createPromptModule()
const axios = require('axios')
const fs = require('fs')

const buildMoviePage = movies => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Movie Page</title>
</head>
<body>
  ${movies.map(movie => `
    <div>
    <h1>Title: ${movie.Title}</h1>
    <img src="${movie.Poster}" alt="${movie.Title}">
    <h3>Director: ${movie.Director}</h3>
    <h4>Year: ${movie.Year}</h4>
    <p>Plot: ${movie.Plot}</p>
  </div>
  `).join('')}
</body>
</html>
  `
  fs.writeFile('movies.html', html, e => e ? console.log(e) : null)
}

prompt([
  {
    type: 'input',
    name: 'movieA',
    message: 'What is your favorite movie?'
  },
  {
    type: 'input',
    name: 'movieB',
    message: 'What is your 2nd favorite movie?'
  },
  {
    type: 'input',
    name: 'movieC',
    message: 'What is your 3rd favorite movie?'
  }
])
  .then(({ movieA, movieB, movieC }) => {

    axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieA}`)
      .then(({ data: movieOne }) => {
        axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieB}`)
          .then(({ data: movieTwo }) => {
            axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${movieC}`)
              .then(({ data: movieThree }) => {
                buildMoviePage([movieOne, movieTwo, movieThree])
              })
          })
      })

    console.log('hi')

  })
  .catch(e => console.error(e))