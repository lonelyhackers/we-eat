var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dennislo930:Letmein24!@cluster0-iyi5w.mongodb.net/admin";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("we-eat");
  var myobj = require('C:/Users/denni/we-eat/profiles/profile0.json');
  dbo.collection("profiles").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
