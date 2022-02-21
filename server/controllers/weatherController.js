const axios = require('axios');

class weatherController {

  static async getWeatherByCoordinate(req,res,next) {
    try {

      const WEATHER_API_KEY = "f3b85101b9b6ebbefd169a4f41d2450e"

      const {lat,lon} = req.body
      if (!lat) throw {
        name: "Latitude is required"
      }
      if (!lon) throw {
          name: "Longitude is required"
      }

      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
      
      res.status(200).json(result.data)
    } catch (err) { 
      next(err)
    }
  }

  static async getWeatherByCity(req,res,next) {
    try {

      const WEATHER_API_KEY = "f3b85101b9b6ebbefd169a4f41d2450e"

      const {city} = req.body
      if (!city) throw {
        name: "city is required"
      }
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
      res.status(200).json(result.data)

    } catch (err) {
      next(err)
    }
  }

}

module.exports = weatherController