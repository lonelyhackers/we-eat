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
    prefs_param += '&prefs[]=' + pref_list[i];
  }
  
  function geoSuccess(position){
    window.location.href = 'pfTemp.html?name=' + input_name.value + '&distance=' + distance.value + prefs_param + '&latitude=' + position.coords.latitude + '&longitude=' + position.coords.longitude;
  }
  function geoError(){
    alert("Please allow us to access your location to help us find restaurants and people nearby!");
  }
  
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  
}
