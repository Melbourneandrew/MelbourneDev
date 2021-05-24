var express = require('express')
var fs = require('fs')
var cheerio = require('cheerio') // server side DOM rendering
var path = require('path')


var app = express()

app.use(express.static(path.join(__dirname + '/')))

//ROUTES
app.get('/', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "About/about.html",
  styleSheet: "About/about.css"
}))
app.get('/home', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "About/about.html",
  styleSheet: "About/about.css"
}))

app.get('/Weather', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Weather/WeatherPage.html",
  script: "Weather/WeatherPage.js",
  styleSheet: "Weather/WeatherPage.css"
}))
app.get('/StockChart', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "StockChart/StockChart.html",
  //script: "StockChart/StockChart.js",
  styleSheet: "StockChart/StockChart.css"
}))
app.get('/iot', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "IOT/IoT_Dashboard.html",
  script: "IOT/iot_dashboard.js",
  styleSheet: "IOT/iot_dashboard.css"
}))
app.get('/legacy', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Legacy/legacy.html",
  //script: "",
  styleSheet: "Legacy/legacy.css"
}))
app.get('/Queryosity', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Queryosity/q.html",
  //script: "",
  styleSheet: "Queryosity/q.css"
}))

//PROJECT INDRA

var url = 'mongodb+srv://admin:MongoRox2k23@mdev.kzf7h.mongodb.net/testdb?retryWrites=true&w=majority';
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/indra', async (req, res) => {
  console.log("Indra Data Incoming");
  const indraData = req.query;
  console.log(JSON.stringify(indraData));

  try{
    await MongoClient.connect();

    const db = MongoClient.db();

    await db.collection('test-collection').insertOne(indraData);
  }catch(err){
    console.log(err);
    res.status(500);
    res.send(err);
  }
})

app.get('/indra-data', async (req, res) => {
  console.log("Indra Data Requested");

  try{
    await MongoClient.connect();

    const db = MongoClient.db();

    const indraData = await db.collection('test-collection').find({}).toArray();

    res.json(indraData);
  }catch(err){
    console.log(err);
    res.status(500);
    res.send(err);
  }
})

app.get('/indra-drop', async (req,res) => {
  console.log("Indra data drop requested...");

  try{
    await MongoClient.connect();

    const db = MongoClient.db();

    db.collection('test-collection').drop(function(err, delOK){
      if(err) throw err;
      if(delOK) console.log("Indra data dropped")
    });

    res.status(200);
  }catch(err){
    console.log(err);
    res.status(500);
    res.send(err);
  }
})

//PROJECT INDRA END

var port = 8080
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})


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
