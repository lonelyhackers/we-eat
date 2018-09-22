var prefs = document.getElementById('prefs');
var next_button = document.getElementById('next');
var input_name = document.getElementById('input_name');
var distance = document.getElementById('distance');

function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

prefs.onclick = function(){
  next_button.disabled = false;
}

next_button.onclick = function(){
  var pref_list = getSelectValues(prefs);
  
  var prefs_param = '';
  for (var i = 0; i < pref_list.length; i++){
    prefs_param += '&prefs=' + pref_list[i];
  }
  
  
  
  var startPos;
  var nudge = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  
  
  
  
  window.location.href = 'pfTemp.html?name=' + input_name.value + '&distance=' + distance.value + prefs_param; 
}
