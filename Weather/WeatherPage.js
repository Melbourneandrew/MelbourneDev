// api key: 0a2f33e985d7fe7a97c4598975c80c3e
// http req: http://api.openweathermap.org/data/2.5/weather?q=Dallas,us&appid=0a2f33e985d7fe7a97c4598975c80c3e
const key = '0a2f33e985d7fe7a97c4598975c80c3e'

var getWeatherData = function(callback, city) {
  var httpReq = new XMLHttpRequest();

  const reqURL = `http://api.openweathermap.org/data/2.5/weather?q=${city},us&appid=${key}`

  httpReq.open("GET", reqURL, true);
  httpReq.send();
  httpReq.onreadystatechange = function() {
    callback(JSON.parse(httpReq.responseText));
  }
}

var weatherDataHandler = function(weatherObj) {
  console.log(weatherObj)

  var weatherDesc = weatherObj.weather[0].description;
  var humidity = weatherObj.main.humidity
  // kelvin -> fahrenheit
  var tempMin = Math.round(weatherObj.main.temp_min * 9 / 5 - 459.67);
  var tempMax = Math.round(weatherObj.main.temp_max * 9 / 5 - 459.67);

  $("#TempHigh").text(tempMax)
  $("#TempLow").text(tempMin)
  $("#Humidity").text(humidity)
  $("#Description").text(weatherDesc)
  $("#WeatherLocation").text(`Weather in ${weatherObj.name}`)

  // Native way incase I'm ever strong enough to abandon jquery
  // document.getElementById("temp").innerHTML = temp;
  // document.getElementById("weather").innerHTML = weatherDesc;
  // document.getElementById("rain").innerHTML = rain;

}

$(function() {
  var citys = {NEWYORK:"New+York", LOSANGELES:"Los+Angeles", DALLAS:"Dallas"}
  //Default case / easter egg
  var location = "Dhaka, BD"
  $('#LosAnglesBtn').on('click', () => {
    $('#LosAnglesBtn').addClass('active')
    $('#DallasBtn').removeClass('active')
    $('#NewYorkBtn').removeClass('active')

    location = citys.LOSANGELES
  })
  $('#DallasBtn').on('click', () => {
    $('#LosAnglesBtn').removeClass('active')
    $('#DallasBtn').addClass('active')
    $('#NewYorkBtn').removeClass('active')

    location = citys.DALLAS
  })
  $('#NewYorkBtn').on('click', () => {
    $('#LosAnglesBtn').removeClass('active')
    $('#DallasBtn').removeClass('active')
    $('#NewYorkBtn').addClass('active')

    location = citys.NEWYORK
  })
  $('#chkWeather').on('click', () => {
    getWeatherData(weatherDataHandler, location)
  })
})
