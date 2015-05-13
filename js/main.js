/*jshint unused: true, node: true */
/*jslint unparam: true, node: true */
/*jshint -W117 */ /*jshint -W098 */
var API_URL = 'http://api.wunderground.com/api/c04feb757b0acf33/conditions/geolookup/forecast10day/q/';

//zipcode, and it works
window.onload = function(){ //difference from codepen is I need the window.onlead because the scripts are executing before the elements are loaded.
var btnZipCode = document.querySelector('#btnZipCode'); //creates the button element using the id from the button input

  btnZipCode.onclick = function() { //watches for the button click

  var input = document.querySelector('#zipCode'); //takes the user's zip code input
  var zipcode = input.value; //takes the value of the user imput, forms it so can be used in the json

  getJSON(API_URL + zipcode + '.json', function(data) {
    var span = document.querySelector('#temp'); //puts the formed data from var zipcode as a string, putting it in the span, which is at the end of the var API_URL
    span.innerHTML = data.current_observation.temp_f; //HERE'S THE  WEATHER. SWEET JESUS.
  });
};

//geopositon, right here

navigator.geolocation.getCurrentPosition(function(location) { //creating the location function; to be determined by lat and long; coord.latitude are in the json, but we're shortening it so that it can be appended to getJSON's data function; we'll use data to display weather by geoposition
  var lat = location.coords.latitude;
  var long = location.coords.longitude;
  getJSON(API_URL + lat + ',' + long + '.json', function(data) { //fills out the end of the url, takes information from current position
    var span = document.querySelector('#temp');
    span.innerHTML = data.current_observation.temp_f; //MORE WEATHER FER YA

    /*
     Five-day: This needs to create an array of an array. we're still inside the geoposition object, so let's use that api call
      */
  	var dayArray = ['#dayOne', '#dayTwo', '#dayThree', '#dayFour', '#dayFive']; //for the array corresponding to the divs in the html
    for (i = 0; i < 5; i++) { //this starts the loop to five iterations
      var day = data.forecast.simpleforecast.forecastday[i];//takes data from the json call and creates an array with the value of i
      var span = document.querySelector(dayArray[i]); //this finds the array in the html, and at the start of the function we're looping through the json and now we're injecting into the html array
      var month = day.date.monthname;
      var high = day.high.fahrenheit; // we're gonna grab this one
      var low = day.low.fahrenheit; // and this one
      var icon = day.icon;
      var conditions = day.conditions;
      var dayOfWeek = day.date.weekday; //and this one
      var iconPath = day.icon_url; // and this one
      span.innerHTML = dayOfWeek + '<br>' + high + ' <img src="' + iconPath + '">' + low; // img tag is written as a string so that it displays in the html
console.log(day);
    }
  }); //closes getJSON object
});
};

function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };

  xhr.send();
}
