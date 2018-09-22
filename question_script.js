var prefs = document.getElementById('prefs');
while(true){
  if(prefs.val().length == 0){
    document.getElementById('next').disabled = false;
  }else{
    document.getElementById('next').disabled = true;
  }
}
