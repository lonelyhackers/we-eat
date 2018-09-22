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
  
  //window.location.href = 'profileTemplate.html';
  console.log(input_name);
  console.log(distance);
  console.log(prefs_param);
  window.location.href = 'profileTemplate.html?name=' + input_name.value + '&distance=' + distance.value + prefs_param; 
}
