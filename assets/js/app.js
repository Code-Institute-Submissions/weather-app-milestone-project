$(document).ready(function() {
  var fahrenheit, celsius;
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;
  var apiKey = `b25ca364bc04acd2ca3e3aa725eb7097`; //<weather-api-keys>
  getLatLong();

  function getLatLong() {
    $.ajax({
      url: `https://geoip-db.com/json/`,
      type: `GET`,
      dataType: `json`,
      success: function(data) {
        var lat = data.latitude;
        var long = data.longitude;
        let weatherUrl = `${weatherApiUrl}?lat=${lat}&lon=${long}&APPID=${apiKey}&units=metric`; //Change weather 
        //in local scope
        getWeatherData(weatherUrl, data.city); //get data to show in browser. Access city as argument?
      },
      error: function(err) {
        alert(`Oops something went wrong, Please try again.`);
        console.log(err);
      }
    });
  }
  $(`#searchCity`).submit(function(e) {
    e.preventDefault();
    let cityName = $(`#city-name`).val();
    getWeather(cityName);
  });

  function getWeather(cityName) {
    console.log(cityName);
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${apiKey}&units=metric`;
    getWeatherData(weatherUrl, cityName); //is cityName assgined to the city parameter?
  }

  function getWeatherData(weatherUrl, city) { //data function
    $.ajax({
      url: weatherUrl,
      type: `GET`,
      dataType: `json`,
      success: function(data) {
        var temprature = Math.round(data.main.temp);
        celsius = temprature;
        fahrenheit = celsius * 1.8 + 32;
        var icon = data.weather[0].icon;
        var weatherDetail = data.weather[0].main + ", " + data.weather[0].description;
        var humidity = data.main.humidity;
        var pressure = data.main.pressure;
        var sunrise = data.sys.sunrise;
        var sunset = data.sys.sunset;
        $(`.city`).html(`City<br>${city}`);
        $(`.weatherDetail`).html(weatherDetail);
        $(`.iconpic>img`).attr(`src`, `http://openweathermap.org/img/w/${icon}.png`); //update the icon based on weather
        $('.temp').html(`temperature<br>${temprature}&#8451;`); //update the temprature
        $('.humidity').html(`Humidity: ${humidity}%`);
        $('.pressure').html(`Pressure: ${pressure}`);
        $('.sunrise').html(`Sunrise: ${sunrise}`);
        $('.sunset').html(`Sunset: ${sunset}`);
      },
      error: function(err) {
        alert(`Please type a City name`);
        console.log(err);
      }
    });
  }

  $(`.toggle .button`).click(function() {
    // if the div has attribute id as c then convert temperature to fahrenheit
    if ($(`.toggle`).attr(`id`) == `c`) {
      $(`.temp`).html(`temperature<br>${fahrenheit}&#8457;` );
      $(`.toggle`).attr(`id`, `f`);
      $(`.button`).html(`Get Celsius`);
    }
    else if ($(`.toggle`).attr(`id`) == `f`) {
      //else if div has attribute id as f than convert temperature to celsius
      $(`.temp`).html(`temperature<br>${celsius}&#8451;`);
      $(`.toggle`).attr(`id`, `c`);
      $(`.button`).html(`Get Fahrenheit`);
    }
  });
});
