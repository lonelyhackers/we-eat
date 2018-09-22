while(true){
  var prefs = document.getElementById('prefs');
  if(prefs.val().length === 0){
    document.getElementById('next').disabled = true;
  }else{
    document.getElementById('next').disabled = false;
  }
}
