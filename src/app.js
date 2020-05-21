const path = require('path')
const express = require('express')
const hbs =  require('hbs')
require('dotenv').config()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Guillamoure'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Guillamoure"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    message: "Oh god, everything is on fire!!!",
    name: "Guillamoure"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: "Please provide an address"
    })
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
    if (error){
      return res.send({ error })
    } else {
      forecast(latitude, longitude, (error, { overall, temperature, feelslike, humidity}) => {
        if (error){
          return res.send({ error })
        }
        // console.log(location)
        // console.log(overall + `. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`)
        res.send({
          address: req.query.address,
          forecast: `${overall}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The humidity is ${humidity}% there.`,
          location
        })
      })
    }
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search){
    return res.send({
      error: "please provide a search term"
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "404 Help",
    name: "Guillamoure",
    error: "Help article not found"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Guillamoure",
    error: "Page not found"
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
