var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dennislo930:Letmein24!@cluster0-iyi5w.mongodb.net/admin";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("we-eat");
  dbo.collection("profiles").findOne({"Name":"Anoop Bhat"}, function(err, result) {
    if (err) throw err;
    console.log(result.Prefs);
    db.close();
  });
});