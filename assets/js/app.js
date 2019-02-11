$(document).ready(function() {
  var fahrenheit, celsius;
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;
  var apiKey = `b25ca364bc04acd2ca3e3aa725eb7097`;
  getLatLong();

  function getLatLong() {
    $.ajax({
      url: `https://geoip-db.com/json/`,
      type: `GET`,
      dataType: `json`,
      success: function(data) {
        var lat = data.latitude;
        var long = data.longitude;
        let weatherUrl = `${weatherApiUrl}?lat=${lat}&lon=${long}&APPID=${apiKey}&units=metric`;
        getWeatherData(weatherUrl, data.city);
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
    getWeatherData(weatherUrl, cityName);
  }

  function getWeatherData(weatherUrl, city) {
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
        $(`.iconpic>img`).attr(`src`, `http://openweathermap.org/img/w/${icon}.png`);
        $('.temp').html(`temperature<br>${temprature}&#8451;`);
        $('.humidity').html(`Humidity <br> ${humidity}%`);
        $('.pressure').html(`Pressure <br> ${pressure}`);
        $('.sunrise').html(`Sunrise <br> ${formatTime(sunrise)}`);
        $('.sunset').html(`Sunset <br> ${formatTime(sunset)}`);
      },
      error: function(err) {
        alert(`Please type a City name`);
        console.log(err);
      }
    });
  }

  function formatTime(time) {

    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let formattedTime = `${hours}:${minutes.substr(-2)}`;
    return formattedTime;

  }

  $(`.toggle .button`).click(function() {
    // if the div has attribute id as c then convert temperature to fahrenheit
    if ($(`.toggle`).attr(`id`) == `c`) {
      $(`.temp`).html(`temperature<br>${fahrenheit}&#8457;`);
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
