var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://dennislo930:Letmein24!@cluster0-iyi5w.mongodb.net/admin";
var url_string = window.location.href;
var url = new URL(url_string);
var name = url.searchParams.get('name');
var distance = url.searchParams.get('distance');
var prefs = url.searchParams.get('prefs[]').split(',');
var latitude = url.searchParams.get('latitude');
var longitude = url.searchParams.get('longitude');

var clicked = false;

var cur_profile;//facepalms

var excluded_profile_names = [];

document.getElementById('no_button').onclick = function(){
	console.log('yo');
	clicked = true;
}
	
show_best_match();

//returns array of users of decreasing score (entries are of format [score, JSON])
function show_best_match(){
  var scores = [];
  MongoClient.connect(url, function(err, db) {
	  var dbo = db.db("we-eat");
	  var cur_profile = dbo.collection("profiles").find();
	  cur_profile.each(function(err, item) {
		if(item == null) {
			db.close();
			break;
		}
		var dist = calc_distance(latitude, longitude, cur_profile.latitude, cur_profile.longitude);
		var cur_profile_prefs = cur_profile.Prefs.split(',');
		var matching = matching_strings(prefs,cur_profile_prefs);//number of matching prefs
		
		if(dist > 1609.34*distance || dist > 1609.34*cur_profile.distance) {
			continue;
		}
		
		scores.push([matching, export(cur_profile.Name)]);
		
		/*var formatted_url = 'https://api.yelp.com/v3/businesses/search?latitude=' + String(latitude) + '&longitude=' + String(longitude) + '&radius=' + String(distance*1609) + '&categories=' + matching.toString();
		get_nearby_restaurants(formatted_url);*/
	  });
	});
  scores.sort(sortFunction).reverse();
for(var k = 0; k < scores.length; k++){
	newProfile(scores[k][1]);
	while(!clicked){}
	clicked = false;
}
}

//sort function for 2D-array
function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

//haversine formula for lat/log diff to distance in meters
function calc_distance(lat1,lon1,lat2,lon2){//in degrees
  var R = 6371e3; //radius of earth in meters
  var φ1 = lat1.toRadians();
  var φ2 = lat2.toRadians();
  var Δφ = (lat2-lat1).toRadians();
  var Δλ = (lon2-lon1).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  
  return d;
}

//Get name's info from MongoDB, returns in form of JSON object
function export(name) {
	var res;
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var res;
	  var dbo = db.db("we-eat");
	  dbo.collection("profiles").findOne({"Name":name}, function(err, result) {
		if (err) throw err;
		res = JSON.parse(result);
		db.close();
	  });
	});
	return res;
}

//access database and get the number of profiles
function get_num_profiles(){
  var dbo = db.db("we-eat");
  return dbo.collection("profiles").count();
}

//code to load JSON from stackoverflow. hopefully it works
function get_profile(number) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '/profiles/profile' + String(number) + '.json', false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      cur_profile = JSON.parse(xobj.responseText);
    }
  };
  xobj.send(null);
 }

function get_nearby_restaurants(formatted_url){
  var xobj = new XMLHttpRequest();
  xobj.open("GET", formatted_url, false);
  xobj.setRequestHeader('Authorization','Bearer Zm7gV6RHPno_RB4Kclkda_mc_Q7nAh7R72Iju71zoY9HGxfaXqUqXALMrT4adBC8kUVr5FdPI9CDrG2zCWUJnjT36o73X8JFBqK-YhprJeANbGSbNr5QZQGzIIymW3Yx');
  xobj.send();
  console.log('yo');
  xobj.onreadystatechange = function(){
    if (xobj.readyState == 4 && xobj.status == "200") {
      console.log('It worked');
    }
  }
  /*$.ajax({
    type: "GET",
    beforeSend: function(request){
      request.withCredentials = true;
      request.setRequestHeader('Authorization','Bearer Zm7gV6RHPno_RB4Kclkda_mc_Q7nAh7R72Iju71zoY9HGxfaXqUqXALMrT4adBC8kUVr5FdPI9CDrG2zCWUJnjT36o73X8JFBqK-YhprJeANbGSbNr5QZQGzIIymW3Yx'); 
    },
    headers: {'Authorization' : 'Bearer Zm7gV6RHPno_RB4Kclkda_mc_Q7nAh7R72Iju71zoY9HGxfaXqUqXALMrT4adBC8kUVr5FdPI9CDrG2zCWUJnjT36o73X8JFBqK-YhprJeANbGSbNr5QZQGzIIymW3Yx'},
    url: formatted_url,
    dataType : 'jsonp',
    success: function(msg) {
      console.log('Hey it worked');
    }
  });*/
}

//returns number of matches between two string arrays
function matching_strings(stra1,stra2){
  var count = 0;
  for(var i = 0; i < stra1.length; i++){
    if(stra2.includes(stra1[i])){
       count++;
    }
  }
  return count;
}

function newProfile(json){
    document.getElementById("input0").innerHTML = json[Name]
    document.getElementById("input1").innerHTML = json[Distance]
    document.getElementById("input2").innerHTML = json[Location]
    document.getElementById("input3").innerHTML = json[Prefs]
}

