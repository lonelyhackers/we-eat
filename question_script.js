while(true){
  var prefs = document.getElementById('prefs');
  if(prefs.val().length === 0){
    document.getElementById('next').disabled = false;
  }else{
    document.getElementById('next').disabled = false;
  }
  document.getElementById('test').value = prefs.val().length;
}
