var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dennislo930:abcd123!@cluster0-iyi5w.mongodb.net/admin";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("we-eat");
  dbo.collection("profiles").findOne("Anoop Bhat", function(err, result) {
    if (err) throw err;
    console.log(result.name);
    db.close();
  });
}); 