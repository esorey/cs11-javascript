var appid = 'GET_YOUR_OWN';  // insert valid APPID here

function onWeather(err, data) {
  if(err) {
    /* Toggle the results display for the response display.
     * Print an error message in the error element and change its display so
     * that it is no longer hidden.
     */
    var el = document.getElementById("error");
    var response = document.getElementById("response");
    var results = document.getElementById("results");

    results.style.display = 'none';
    response.style.display = '';
    el.innerHTML = 'Error - could not find weather for the given zip code.';
    el.style.display = '';
    return;
  }

  // Empty the error element and hide it.
  var err_el = document.getElementById("error");
  err_el.innerHTML = '';
  err_el.style.display = 'none';

  var el = document.getElementById('response');

  var temp = data.main.temp;
  document.getElementById("temp").innerHTML = temp + " &deg;F";

  var windspeed = data.wind.speed;
  // Set the element with ID windspeed's content to the windspeed above,
  // with the unit "mph" afterwards
  var windspeed_elt = document.getElementById('windspeed');
  windspeed_elt.innerHTML = windspeed + ' mph';

  var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  var iconEl = document.getElementById("icon");
  // Create an img tag with src set to iconUrl, and set the content of the
  // icon element to that image.
  var img = document.createElement("IMG");
  img.setAttribute('src', iconUrl);
  iconEl.innerHTML = ''; // Remove previous images.
  iconEl.appendChild(img);

  var locationEl = document.getElementById("location");
  locationEl.innerHTML = data.name;

  // Make the response element and results elements both visible
  var response = document.getElementById("response");
  var results = document.getElementById("results");
  response.style.display = '';
  results.style.display = '';
}

function onZipCode(err, data) {
  if(err) {
    /* Toggle the results display for the response display.
     * Print an error message in the error element and change its display so
     * that it is no longer hidden.
     */
    var el = document.getElementById("error");
    var response = document.getElementById("response");
    var results = document.getElementById("results");

    results.style.display = 'none';
    response.style.display = '';
    el.innerHTML = 'Error - provided zip code does not seem to exist.';
    el.style.display = '';
    return;
  }
  var firstMatch = data.places[0];
   /* Get the city name, state name and country from the place data returned by
   * the Zippopotamus API.
   */
  var country = data['country'];
  var city = firstMatch['place name'];
  var state = firstMatch['state'];
  var url = "http://api.openweathermap.org/data/2.5/weather";
   /* Access the url above with the query string below:
   *   ?APPID=[APPID]&units=imperial&q=[CITY],[STATE],[COUNTRY]
   * Where the things in brackets were found above.
   */
   var query_str = '?APPID=' + appid + '&units=imperial&q=' + city +
                   ',' + state + ',' + country;
   AJAX.getJSON(url + query_str, onWeather);

}

function getWeather(e) {
  e.preventDefault(); // stop submit
  var zipCode = document.getElementById("zipCode").value;
  if(!zipCode) {
     /* Toggle the results display for the response display.
     * Print an error message in the error element and change its display so
     * that it is no longer hidden.
     */
    var el = document.getElementById("error");
    var response = document.getElementById("response");
    var results = document.getElementById("results");

    results.style.display = 'none';
    response.style.display = '';
    el.style.display = '';
    el.innerHTML = 'Error - please enter a zip code.';
    return;
  }
   /* Access the url http://api.zippopotam.us/us/ZZZZZ where ZZZZ is the given
   * zip code.
   */
   var url = 'http://api.zippopotam.us/us/' + zipCode;
   AJAX.getJSON(url, onZipCode)
}
