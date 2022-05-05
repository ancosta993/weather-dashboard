// fetching data from the API
var getWeatherData = function (){
   var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,daily&appid=c8f16f5a8fcb4998319fd1d12ef65633"
   fetch(apiUrl).then(function(response){
      if(response.ok){
         response.json().then(function(data){
            displayData(data);
         });
      } else {
         alert("Couldn't connect to weather App");
      }
   })

}

