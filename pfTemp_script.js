var url_string = window.location.href;
var url = new URL(url_string);
var name = url.searchParams.get('name');
var distance = url.searchParams.get('distance');
var prefs = url.searchParams.get('prefs[]').split(',');
var latitude = url.searchParams.get('latitude');
var longitude = url.searchParams.get('longitude');

var cur_profile;//facepalms

var excluded_profile_names = [];

show_best_match();

function show_best_match(){
  var best_index = 0;
  var highest_match = 0;
  for(var i = 0; i < get_num_profiles(); i++){
    get_profile(i);
    if(excluded_profile_names.includes(cur_profile.Name)){
      continue;
    }
    var cur_profile_prefs = cur_profile.Prefs.split(',');
    var matching = matching_strings(prefs,cur_profile_prefs);//array containing matching prefs
    
    var formatted_url = 'https://api.yelp.com/v3/businesses/search?latitude=' + String(latitude) + '&longitude=' + String(longitude) + '&radius=' + String(distance*1609) + '&categories=' + matching.toString();
    get_nearby_restaurants(formatted_url);
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

function get_nearby_restaurants(formatted_url){
  var xobj = new XMLHttpRequest();
  xobj.open("GET", formatted_url, false);
  xobj.setRequestHeader('Authorization','Bearer Zm7gV6RHPno_RB4Kclkda_mc_Q7nAh7R72Iju71zoY9HGxfaXqUqXALMrT4adBC8kUVr5FdPI9CDrG2zCWUJnjT36o73X8JFBqK-YhprJeANbGSbNr5QZQGzIIymW3Yx');
  xobj.send();
  console.log('yo');
  xobj.onreadystatechange = function(){
    if (xobj.readyState == 4 && xobj.status == "200") {
      var textobj = JSON.parse(xobj.responseText);
      document.getElementbyId('Name').innerHTML = xobj.responseText;
    }
  }
}

//returns array of matches between two string arrays
function matching_strings(stra1,stra2){
  var matching = [];
  var count = 0;
  for(var i = 0; i < stra1.length; i++){
    for(var j = 0; j < stra2.length; j++){
      if(stra1[i] == stra2[j]){
        matching.push(stra1);
        break;
      }
    }
  }
  return matching;
}
