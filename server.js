const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

require("dotenv").config();
const apiKey = "${358f880b4dda772477f9a1b571fba225}$";
let weather
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
    res.render("index", { weather: null, error: null });
});
app.post('/',  function(req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=358f880b4dda772477f9a1b571fba225`;
    request(url, function(err, res, body) {
        if (err) 
        {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } 
        else {
             weather = JSON.parse(body);
            console.log(weather);
        }
} )

if (weather.main == undefined) {
    res.render('index', { weather: null, error: 'Error, please try again' });
} else {
    
    let place = `${weather.name}, ${weather.sys.country}`,
      
      weatherTimezone = `${new Date(
        weather.dt * 1000 - weather.timezone * 1000
      )}`;
    let weatherTemp = `${weather.main.temp}`,
      weatherPressure = `${weather.main.pressure}`,
      
      weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
      weatherDescription = `${weather.weather[0].description}`,
      humidity = `${weather.main.humidity}`,
      clouds = `${weather.clouds.all}`,
      visibility = `${weather.visibility}`,
      main = `${weather.weather[0].main}`,
      weatherFahrenheit;
    weatherFahrenheit = (weatherTemp * 9) / 5 + 32;

    
    function roundToTwo(num) {
      return +(Math.round(num + "e+2") + "e-2");
    }
    weatherFahrenheit = roundToTwo(weatherFahrenheit);
    res.render("index", {
        weather: weather,
        place: place,
        temp: weatherTemp,
        pressure: weatherPressure,
        icon: weatherIcon,
        description: weatherDescription,
        timezone: weatherTimezone,
        humidity: humidity,
        fahrenheit: weatherFahrenheit,
        clouds: clouds,
        visibility: visibility,
        main: main,
        error: null,
      });
    }
  

})

            app.listen(8080, function () {
                console.log("Weather app listening on port 8080!");
              })

              