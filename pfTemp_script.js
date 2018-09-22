var url_string = window.location.href;
var url = new URL(url_string);
var name = url.searchParams.get('name');
var distance = url.searchParams.get('distance');
var prefs = url.searchParams.get('prefs');
var latitude = url.searchParams.get('latitude');
var longitude = url.searchParams.get('longitude');

var cur_profile;//facepalms

show_best_match();


function show_best_match(){
  var best_index = 0;
  var highest_match = 0;
  for(var i = 0; i < get_num_profiles(); i++){
    get_profile(i);
    var cur_profile_prefs = cur_profile.Prefs.split(',');
    console.log(cur_profile_prefs);

    var matching = matching_prefs(prefs,cur_profile_prefs);
    console.log(matching);
    
    if(matching > highest_match){
      best_index = i;
      highest_match = matching;
    }
  }
}

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
  return 2;
}

//code to load json from stackoverflow. hopefully it works
function get_profile(number) {   
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'profiles/profile' + String(number) + '.json', false);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      cur_profile = JSON.parse(xobj.responseText);
    }
  };
  xobj.send(null);
 }

//returns how many prefs match between two pref arrays
function matching_prefs(prefs1,prefs2){
  var count = 0;
  for(var i = 0; i < prefs1.length; i++){
    for(var j = 0; j < prefs2.length; j++){
      if(prefs1[i] == prefs2[j]){
        count++;
        break;
      }
    }
  }
  return count;
}
