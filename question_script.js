var prefs = document.getElementById('prefs');
var next_button = document.getElementById('next');
var input_name = document.getElementById('name');
var distance = document.getElementById('distance');

prefs.onclick = function(){
  next_button.disabled = false;
}

next_button.onclick = function(){
  var prefs_param = '';
  for (var i=0; i < prefs.value.length; i++){
    prefs_param += '&prefs=' + prefs.value[i];
  }
  window.location.href = 'profileTemplate.html'
  //window.location.href = 'profileTemplate.html?name=' + input_name.value + '&distance=' + distance.value + prefs_param; 
}
