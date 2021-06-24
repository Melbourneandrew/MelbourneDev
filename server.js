var express = require('express')
var path = require('path')

var app = express()

app.use(express.static(path.join(__dirname + '/')));

const router = require('./routes.js')
app.use(router);



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
