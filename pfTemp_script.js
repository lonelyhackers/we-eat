var url_string = window.location.href;
var url = new URL(url_string);
var name = url.searchParams.get('name');
var distance = url.searchParams.get('distance');
var prefs = url.searchParams.get('prefs');
var latitude = url.searchParams.get('latitude');
var longitude = url.searchParams.get('longitude');

var cur_profile;//*facepalms

/*
for(var i = 0; i < get_num_profiles(); i++){
  var profile = get_profile(i);
  
}*/

//testing ability to get profile info from json
get_profile(1)
console.log(cur_profile);

//haversine formula
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

//somehow access database and get the number of profiles
function get_num_profiles(){
  return 1;
}

//code to load json from stackoverflow. hopefully it works
function get_profile(number) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'profiles/profile' + String(number) + '.json', false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      console.log(JSON.parse(xobj.responseText));
      cur_profile = JSON.parse(xobj.responseText);
    }
  };
  xobj.send(null);
 }
