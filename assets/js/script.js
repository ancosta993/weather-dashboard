
// initialize an array to seach the city names
var searchHistoryArr = [];

var currentCondition = document.querySelector("#current-condition");
var userFormEl = document.querySelector("#user-form");
var userSearchInput = document.querySelector("#city");
var searchHistory = document.querySelector(".search-history");
var futureForcastContainer = document.querySelector(".future-condition-container");


// function to display general info (name, date, icon)
var displayCity = function(data){
   // clear the current form
   currentCondition.textContent = "";
   var cityName = document.createElement("h3");
   var weatherIcon = document.createElement("img");
   cityName.classList = "card-header text-center bg-dark text-light";
   cityName.textContent = data.name + " (" + moment(data.dt*1000).format("MM/DD/YYYY")+")";
   weatherIcon.setAttribute("src","https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
   cityName.appendChild(weatherIcon);
   return(cityName);
};

// function to display temperature
var displayTemp = function(data){
   var tempListEl = document.createElement("li");
   tempListEl.className = "list-group-item";
   tempListEl.textContent = "Temperature: " + data.main.temp + " F";
   return tempListEl;
};


// function to display wind speed
var displayWindSpeed = function(data){
   var windSpeedListEl = document.createElement("li");
   windSpeedListEl.className = "list-group-item";
   windSpeedListEl.textContent = "Wind Speed: " + data.wind.speed + " MPH";
   return windSpeedListEl;
}
// function to display humidity
var displayHumid = function(data){
   var humid = document.createElement("li");
   humid.className  = "list-group-item";
   humid.textContent = "Humidity: " + data.main.humidity + "%";
   return humid;
}

// displaying the fetched information in the
var displayCurrent = function(data){
   // Show city name, date, and weather icon
   currentCondition.appendChild(displayCity(data));

   // Make an ul container for listing current weather conditions
   var currList = document.createElement("ul");
   currList.classList = "card-body list-group";

   // show the current conditions as list element
   // temperature
   currList.appendChild(displayTemp(data));
   // wind speed
   currList.appendChild(displayWindSpeed(data));
   // humidity
   currList.appendChild(displayHumid(data));
   // UV index
   // get Uv index from a different API
   var getUvIndex = function(data){
      var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon="+data.coord.lon+"&units=imperial&appid=c8f16f5a8fcb4998319fd1d12ef65633";

      fetch(apiUrl).then(function(response){
         if(response.ok){
            response.json().then(function(uvData){
               var uvIndexEl = document.createElement("li");
               // creating a span for color coding index
               var indexEl = document.createElement('span');
               indexEl.textContent = uvData.current.uvi;
               // use condition to color code the uvi index
               if(uvData.current.uvi >= 6){
                  indexEl.classList = "badge badge-danger";
               } else if (uvData.current.uvi < 6 && uvData.current.uvi>=3) {
                  indexEl.classList = "badge badge-warning";
               } else {
                  indexEl.classList = "badge badge-success";
               }

               uvIndexEl.className = "list-group-item";
               uvIndexEl.textContent = "UV index: "
               uvIndexEl.appendChild(indexEl);
               currList.appendChild(uvIndexEl);
            });
         } else {
            alert("Could not find the UV index.");
         }
      });
   };
   getUvIndex(data);
   currentCondition.appendChild(currList);


};


// fetching weather data from the API
var getWeatherData = function (city){

   var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=c8f16f5a8fcb4998319fd1d12ef65633"

   fetch(apiUrl).then(function(response){
      if(response.ok){
         response.json().then(function(data){
            displayCurrent(data);
         });
      } else {
         alert("Could not find the city! Please check your spelling.");
      }
   });

   var forcastUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=c8f16f5a8fcb4998319fd1d12ef65633"

   var displayForcast = function(obj){

      // make the card
      var card = document.createElement("div");
      card.classList = "card days";
      // card header
      var cardHead = document.createElement("h3");
      cardHead.textContent = moment(obj.dt_txt).format("MM/DD/YYYY");
      cardHead.className = "card-header"
      // card body 
      var cardBody = document.createElement("div");
      cardBody.className = "card-body";

      // list icon
      var cardIcon = document.createElement("img");
      cardIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + obj.weather[0].icon + "@2x.png");
      cardBody.appendChild(cardIcon);      

      // list temp
      var tempEl = document.createElement("li");
      tempEl.textContent = "Temp: " + obj.main.temp + " F";
      cardBody.appendChild(tempEl);

      // list humidity
      var humidEl = document.createElement("li");
      humidEl.textContent = "Humidity: " + obj.main.humidity +"%";
      cardBody.appendChild(humidEl);

      // list wind speed
      var windEl = document.createElement("li");
      windEl.textContent = "Wind: " + obj.wind.speed + " MPH";
      cardBody.appendChild(windEl);

      
      card.appendChild(cardHead);
      card.appendChild(cardBody);
      futureForcastContainer.appendChild(card);
      

   }

   fetch(forcastUrl).then(function(response){
      if(response.ok){
         response.json().then(function(data){
            console.log(data);
            // get the list of dates from the object
            var dateArr = data.list;
            futureForcastContainer.textContent = '';
            // loop through the list in the object
            for (var i=0;i<dateArr.length;i+=7){
               // displaying the forcast
              displayForcast(dateArr[i]);
              i+=1;
            }
         });
      } else {
         alert("Could not get the forcast data");
      }
   })

}


var storeInBrowser = function(arr){
   var arr = JSON.stringify(arr);
   localStorage.setItem("Search-History", arr);
}

var saveCity = function(city){
   var cityName = document.createElement('li');
   cityName.classList = "list-group-item text-center";
   cityName.setAttribute('data-name', city);
   cityUpper = city.toUpperCase();
   cityName.textContent = cityUpper;
   searchHistoryArr.push(city);
   storeInBrowser(searchHistoryArr);
   searchHistory.appendChild(cityName);
}



var formSubmitHandler = function(event){
   event.preventDefault();
   // get info from the form
   var userSearch = userSearchInput.value.trim();
   if(userSearch){
      getWeatherData(userSearch);
      saveCity(userSearch);
   } else {
      alert("Please enter a city Name");
   }

};

var btnClickHandler = function(event){
   var selectedCity = event.target.getAttribute("data-name");
   if(selectedCity){
      getWeatherData(selectedCity);
   }
};

var getCityNamesHistory = function(){
   cityArr = JSON.parse(localStorage.getItem("Search-History"));
   if (!cityArr){
      cityArr = [];
   } 
   for(var i = 0;i<cityArr.length;i++){
      saveCity(cityArr[i]);
   }
};

getCityNamesHistory();

userFormEl.addEventListener('submit', formSubmitHandler);
searchHistory.addEventListener('click', btnClickHandler);



