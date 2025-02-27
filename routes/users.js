var express = require('express');
var router = express.Router();
const {MongoClient} = require("mongodb");

const uri = ""

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.log(error);
  }
  finally{
    await client.close();
  }
  res.send('respond with a resource');
});

async function listDatabases(client){
  databaseList = await client.db().admin().listDatabases();
  console.log("Databases");
  databaseList.databases.forEach(db => {
    console.log(`-${db.name}`);
  });

  //await createTables(client);
}

async function createTables(client){
  try {
    const out = await client.db("new").collection("thecustomers").insertOne({name: "tom", age: "10"});
    console.log(`inserted id is ${out.insertedId}`);
  } catch (error) {
    console.log(error);
  }

}

module.exports = router;
