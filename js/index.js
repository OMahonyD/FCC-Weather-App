//When document ready
$(document).ready(function() {

  var lat, lon, url;

  /* Function getLocation */
  var getLocation = function() {
      if (!navigator.geolocation) {
        alert("Geolocation is not available");
        return;
      }

      if (navigator.geolocation) {
        /*geolocation is available*/

        navigator.geolocation.getCurrentPosition(function(position) {

          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=a37dca88f706cbdd765fdc433c8e5e40&callback=?';

          $.getJSON(url, function(json) {

            var celcius = Math.round(json.main.temp - 273.15) + '\u00B0' + 'C';
            var fahrenheit = Math.round(1.8 * (json.main.temp - 273) + 32) + '\u00B0' + 'F';
            //$('body').html(JSON.stringify(json));
            $('.location').html(json.name);
            $('.temp').html(celcius);
            $('.weather_description').html(json.weather[0].description);
            $('.weather_icon').append("<img src='http://openweathermap.org/img/w/" + json.weather[0].icon + ".png'>");

            $('#fahrenheit').on('click', function() {
              $('.temp').html(fahrenheit);
            });

            $('#celcius').on('click', function(){
              $('.temp').html(celcius);
            });
            
          }); //end getJSON
        }); //end getCurrentPosition

      } //end if geolocation available
    } //end getLocation

  getLocation();

}); //end document ready
