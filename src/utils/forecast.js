const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK}&query=${latitude},${longitude}&units=f`
  request({ url, json: true}, (error, { body }) => {
    if (error){
      callback("Unable to connect to weather services!")
    } else if (body.error){
      callback("Unable to find location.")
    } else {
      const {temperature, feelslike, humidity} = body.current
      callback(undefined, {
        temperature,
        feelslike,
        overall: body.current.weather_descriptions[0],
        humidity
      })
    }
  })
}

module.exports = forecast
