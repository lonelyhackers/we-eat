var url_string = window.location.href;
var url = new URL(url_string);
var name = url.searchParams.get('name');
var distance = url.searchParams.get('distance');
var prefs = url.searchParams.get('prefs');
var latitude = url.searchParams.get('latitude');
var longitude = url.searchParams.get('longitude');
