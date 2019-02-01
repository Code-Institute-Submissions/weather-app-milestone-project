$(document).ready(function() {
  var fahrenheit, celsius;
  var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather";
  var apiKey = "b25ca364bc04acd2ca3e3aa725eb7097"; //<weather-api-keys>
  getLatLong();

  /* function to get user's location */
  function getLatLong() {
    $.ajax({
      url: "https://geoip-db.com/json/",
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var lat = data.latitude;
        var long = data.longitude;
        $('.city').html(data.city);
        $('.country').html(data.country_name);
        weatherApiUrl += "?lat=" + lat + "&lon=" + long + "&APPID=" + apiKey + "&units=metric";
        getWeatherData();
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }
  /* function to get weather data from the user's location */
  function getWeatherData() {
    $.ajax({
      url: weatherApiUrl,
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        var temprature = Math.round(data.main.temp);
        celsius = temprature;
        fahrenheit = celsius * 1.8 + 32;
        var icon = data.weather[0].icon;
        var weatherDetail = data.weather[0].main + ", " + data.weather[0].description;
        $('.weatherDetail').html(weatherDetail); //update weather description in html
        $('.iconpic>img').attr('src', 'http://openweathermap.org/img/w/' + icon + '.png'); //update the icon based on weather
        $('.temp').html(temprature + "&#8451;"); //update the temprature
      },
      error: function(err) {
        alert('Oops something went wrong, Please try again.');
        console.log(err);
      }
    });
  }
  /* code to toggle between celsius and fahrenheit */
  /* adding a click event listener on the toggle button */
  $('.toggle .button').click(function() {
    // if the div has attribute id as c then convert temperature to fahrenheit
    if ($('.toggle').attr('id') == 'c') {
      $('.temp').html(fahrenheit + "&#8457;");
      $('.toggle').attr('id', 'f');
      $(".button").html("Get Celsius");
    }
    else if ($('.toggle').attr('id') == 'f') {
      //else if div has attribute id as f than convert temperature to celsius
      $('.temp').html(celsius + "&#8451;");
      $('.toggle').attr('id', 'c');
      $(".button").html("Get Fahrenheit");
    }
  });
});
