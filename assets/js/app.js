$(document).ready(function() {
  //put variables into local scope
  var fahrenheit, celsius;
  var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "b25ca364bc04acd2ca3e3aa725eb7097"; //<weather-api-keys>

  getLatLong();

  function getLatLong(weatherUrl, city) {
    $.ajax({
      url: "https://geoip-db.com/json/",
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var lat = data.latitude;
        var long = data.longitude;
        city = data.city;
        $('.city').html(city);
        weatherUrl = weatherApiUrl + "?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey + "&units=metric";
        getWeatherData(weatherUrl);
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }

  $("#city").submit(function(e) {
    e.preventDefault();
    var cityName = $("#city").val();
    weatherUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey + "&units=metric";
    getWeather(weatherUrl, cityName);
  });
  
  function getWeather(weatherUrl, city) {
    $.ajax({
      url: weatherUrl,
      type: 'GET',
      dataType: 'json',
      succes: function(data) {
        weatherUrl = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&APPID=" + apiKey + "&units=metric";
        getWeatherData(weatherUrl, city);
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }

  function getWeatherData(weatherUrl) {
    $.ajax({
      url: weatherUrl,
      type: 'GET',
      dataType: 'json',
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
        city = data.city;
        $('.city').html(city);
        $('.weatherDetail').html(weatherDetail); //update weather description in html
        $('.iconpic>img').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png'); //update the icon based on weather
        $('.temp').html('temperature' + '<br>' + temprature + "&#8451;"); //update the temprature
        $('.humidity').html('Humidity: ' + humidity + '%');
        $('.pressure').html('Pressure: ' + pressure);
        $('.sunrise').html('Sunrise: ' + sunrise);
        $('.sunset').html('Sunset: ' + sunset);
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }

  $('.toggle .button').click(function() {
    // if the div has attribute id as c then convert temperature to fahrenheit
    if ($('.toggle').attr('id') == 'c') {
      $('.temp').html('temperature' + '<br>' + fahrenheit + "&#8457;");
      $('.toggle').attr('id', 'f');
      $(".button").html("Get Celsius");
    }
    else if ($('.toggle').attr('id') == 'f') {
      //else if div has attribute id as f than convert temperature to celsius
      $('.temp').html('temperature' + '<br>' + celsius + "&#8451;");
      $('.toggle').attr('id', 'c');
      $(".button").html("Get Fahrenheit");
    }
  });
});
