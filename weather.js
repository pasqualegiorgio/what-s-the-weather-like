window.onload = function(){
	getWeatherByCity("Andria");
}

$(function(){
	$("#cityName").submit(function(){
		getWeatherByCity( $("#city").val() );
		return false;
	});

	//$("#state-icon").attr( "onerror", "$(this).hide()" );
});

function getWeatherByCity( request ){
	var key = "efa6f02761d89bccc4da7072252c5102";
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + key + "&units=metric&lang=it&q=";

	$.getJSON( apiUrl + request,  function( data ){
		assign(data);
	});
}

function assign( data ){
	$("#city-name").html( data.name );
	$("#country").html( data.sys.country );

	$("#state-icon").attr( "src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png" );
	$("#state-icon").attr( "title", data.weather[0].main );

	$("#state").html( data.weather[0].description );
	$("#temp").html( data.main.temp + " °C" );

	$("#temp-max").html( data.main.temp_max + " °C" );
	$("#temp-min").html( data.main.temp_min + " °C" );
	$("#humidity").html( data.main.humidity + "%" );
	$("#pressure").html( data.main.pressure + " hpa" );

	var sunrise = new Date( data.sys.sunrise * 1000 ) ;
	var sunset = new Date( data.sys.sunset * 1000 );

	$("#sunrise").html( sunrise.getHours() + ":" + sunrise.getMinutes() + ":" + sunrise.getSeconds() );
	$("#sunset").html( sunset.getHours() + ":" + sunset.getMinutes() + ":" + sunrise.getSeconds() );

	$("#speed").html( Math.round(data.wind.speed * 3.6) + " km/h" );
}
