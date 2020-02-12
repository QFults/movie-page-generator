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
  <div>
    <h1>Title: ${movies[0].Title}</h1>
    <img src="${movies[0].Poster}" alt="${movies[0].Title}">
    <h3>Director: ${movies[0].Director}</h3>
    <h4>Year: ${movies[0].Year}</h4>
    <p>Plot: ${movies[0].Plot}</p>
  </div>
  <div>
    <h1>Title: ${movies[1].Title}</h1>
    <img src="${movies[1].Poster}" alt="${movies[1].Title}">
    <h3>Director: ${movies[1].Director}</h3>
    <h4>Year: ${movies[1].Year}</h4>
    <p>Plot: ${movies[1].Plot}</p>
  </div>
  <div>
    <h1>Title: ${movies[2].Title}</h1>
    <img src="${movies[2].Poster}" alt="${movies[2].Title}">
    <h3>Director: ${movies[2].Director}</h3>
    <h4>Year: ${movies[2].Year}</h4>
    <p>Plot: ${movies[2].Plot}</p>
  </div>
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