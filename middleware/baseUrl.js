class MongoUrl{

  getMongoUrl(){
    const online = "mongodb+srv://lumbert:mayoga%401990@cluster0.hebw5.mongodb.net/test?authSource=admin&replicaSet=atlas-cyzv1k-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
    const local = "mongodb://127.0.0.1:27017";
    return local;
  }
}

module.exports = MongoUrl