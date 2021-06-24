var express = require('express');
var fs = require('fs')
var cheerio = require('cheerio') // server side DOM rendering
var path = require('path')
var router = express.Router();

//ROUTES
router.get('/', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "About/about.html",
  styleSheet: "About/about.css"
}));
router.get('/home', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "About/about.html",
  styleSheet: "About/about.css"
}));
router.get('/Weather', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Weather/WeatherPage.html",
  script: "Weather/WeatherPage.js",
  styleSheet: "Weather/WeatherPage.css"
}));
router.get('/StockChart', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "StockChart/StockChart.html",
  //script: "StockChart/StockChart.js",
  styleSheet: "StockChart/StockChart.css"
}));
router.get('/iot', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "IOT/IoT_Dashboard.html",
  script: "IOT/iot_dashboard.js",
  styleSheet: "IOT/iot_dashboard.css"
}));
router.get('/legacy', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Legacy/legacy.html",
  //script: "",
  styleSheet: "Legacy/legacy.css"
}));
router.get('/Queryosity', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Queryosity/q.html",
  //script: "",
  styleSheet: "Queryosity/q.css"
}));
router.get('/my-ip', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "MyIP/myip.html",
  script: "MyIP/myip.js",
  styleSheet: "MyIP/myip.css"
}));
router.get('/typing-test', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "TypingTest/type.html",
  script: "TypingTest/type.js",
  styleSheet: "TypingTest/type.css"
}));


function buildPage(response, pageSpec) {
  if (pageSpec) {
    pageSpec.homePage = "/" + pageSpec.homePage
    pageSpec.fragment = "/" + pageSpec.fragment
    pageSpec.script = "/" + pageSpec.script
    pageSpec.styleSheet = "/" + pageSpec.styleSheet

    //Loads home page
    const homeFile = fs.readFileSync(path.join(__dirname + pageSpec.homePage))
    //Loads content to be injected into the home page
    const fragFile = fs.readFileSync(path.join(__dirname + pageSpec.fragment))

    //Build Page. Inject frag into home
    const home = cheerio.load(homeFile)
    const frag = cheerio.load(fragFile)
    home('#bodyContentContainer').append(frag("body").html())

    //Add script and stylesheet to page head
    const scriptTag = cheerio.load(`<script type='text/javascript' src='${pageSpec.script}'></script>`)
    const stylesheetTag = cheerio.load(`<link rel='stylesheet' type='text/css' href='${pageSpec.styleSheet}'></link>`)
    home('head').append(scriptTag.html())
    home('head').append(stylesheetTag.html())

    response.send(home.html())

  } else(
    response.status(500).send("Page specifications not passed to buildPage function")
  )

}

module.exports = router;
