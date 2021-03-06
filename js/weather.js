var apikey = '4d8fb5b93d4af21d66a2948710284366';
var storage = window.localStorage;
var lat = storage.getItem('pos_lat'), lon = storage.getItem('pos_lon');

if (lat & lon) {
	updateWeather();
}else if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(onSuccess);
}

function onSuccess(pos) {
	lat = pos.coords.latitude;
	lon = pos.coords.longitude;
	storage.setItem('pos_lat', lat);
	storage.setItem('pos_lon', lon);
	updateWeather();
}

async function updateWeather() {
	let langcode = (navigator.language || navigator.userLanguage).slice(0, 2);
	let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,hourly,minutely&appid=${apikey}&lang=${langcode}&units=metric`);
	let data;

	if (res.ok) data = await res.json();
	let div = document.getElementById('weather-display');
	let cur = data.current.weather[0];
	let icon = `https://openweathermap.org/img/wn/${cur.icon}.png`;
	div.innerHTML = `${cur.main}<img src="${icon}" width="24" height="24"></img> ${data.current.temp}<sup>o</sup>`;
}