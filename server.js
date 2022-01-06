//gcloud app deploy <-- push build to google cloud
var express = require('express')
var path = require('path')

var app = express()

app.use(express.static(path.join(__dirname + '/')));

const router = require('./routes.js')
app.use(router);



app.get('/Web3', (req, res) => buildPage(res, {
  homePage: "HomePage.html",
  fragment: "Web3/Web3.html",
  script: "Web3/Web3.js",
  styleSheet: "Web3/Web3.css"
}))

//PROJECT INDRA

var url = 'mongodb+srv://admin:MongoRox2k23@mdev.kzf7h.mongodb.net/testdb?retryWrites=true&w=majority';
var mongodb = require('mongodb');

app.get('/indra', async (req, res) => {
  console.log("Indra Data Incoming");
  //New client needs to be created for every DB connection :(
  var MongoClient = mongodb.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  const indraData = req.query;
  console.log(JSON.stringify(indraData));

  try{
    await MongoClient.connect();

    const db = MongoClient.db();

    await db.collection('test-collection').insertOne(indraData);

    await MongoClient.close();
    res.status(200);
    res.send("Success");
  }catch(err){
    console.log(err);
    res.status(500);
    res.send(err);
  }
})

app.get('/indra-data', async (req, res) => {
  console.log("Indra Data Requested");
  //New client needs to be created for every DB connection :(
  var MongoClient = mongodb.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try{
    await MongoClient.connect();

    const db = MongoClient.db();

    const indraData = await db.collection('test-collection').find({}).toArray();

    res.json(indraData);

    res.status(200);
  }catch(err){
    console.log(err);
    res.status(500);
    res.send(err);
  }
})

app.get('/indra-drop', async (req,res) => {
  console.log("Indra data drop requested...");
  //New client needs to be created for every DB connection :(
  var MongoClient = mongodb.MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

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
