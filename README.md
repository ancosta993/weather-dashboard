# weather-dashboard
Click here for the deployed project.

## Introduction
This application is used to get the weather information about a given city and its next five days forcast.

## Project Function
- Once loaded, the user is presented with the title and a search bar.
- The search bar prompts the user to enter the name of a city.
- The user can type in the name of the city and press on the search button.
- Upon search, the user is presented with a dashboard on the left hand side of the screen.
- The dashboard shows the current information about the searched city's weather.
- The dash board contains the name and the date.
  - Shows: Temperature, Wind Speed, Humidity, and UV index.
  - UV index is further color coded to show safe, moderate, and danger level.
  - Current weather condition (rain, snow, sunny etc) is represented with an icon.
- At the bottom of the dashboard, the 5-day forcast is shown.
- The forcast contains the date, temperature, wind speed, and humidity.
- The searched city name is saved and showed under the search bar.
- The user can click on those names and the current information about the weather is shown to the user.

## Site Structure.
The structure of the site changes depending on which buttons the user have clicked.
- No input: There is a header, and a search bar under it.
- Search is made: There is a header. Under the header, there are two rows:
  - First row contains the search bar and the current weather information
  - Second row contains the the list of searched cities and the five day forcast.

## Logic (PsudoCode)
The code uses the OpenWeather API for the weather information
The code uses three different endpoints:
  - One to get the lattitude and longitude of the city the user inputs.
  - Second to get the current weather information and icon.
  - Third to get the 5-day forcast.
 
### Take User Input
The user input is taken from the search bar using the `formSubmitHandler`. This function is called when the user clicks on the submit button in the search form.
The click is detected and handled with event listener and handler.
The user input is the used to call three functions to `fetch` necessary information.

### Fetch all the data
Three functions are used for `fetch` function of the javascript.
 - `getWeatherData` to get the current information about the temperature, humidy, and wind speed.
 - `getUvIndex` to get the UV index (Openweather have separte API for this).
 - `getCityLoc` to get the lattitude and longtitude of the city.
 - The code for `fetching` the data for 5-day forcast was written under the scope of another function: `displayWeatherData`.

**`getCityLoc`**
Takes the city name as argument that is inputted by the user and `fetch` the lattitude and longtitude of that city.
Calls the `getWeatherData` function with the arguments: lattitude and longtitude.

**`getWeatherData`**
It takes the lattitude and longtitude information and `fetch` the data for the current weather information. It also `fetch` the data for the 5-day forcast. It then calls the `displayCurrentData` function.

### Display The Data
**`displayCurrentData`**
 Takes the response obj from the `getWeatherData`.
 It makes a `div` and gives it the `class=card`. This class is from the Bootstrap framework. It makes a web card.
 It creates a `h2 class='card-header'` for the header containing the text {city name (data) icon}
 It then creates a `ul class=card-body list-group` to contain the current weather information.
 It creats 5 `li class=list-group-item` with text contents from the response obj.
 It creates 5 more cards under the curent weather dashboard.
 
 ### Keep a history
 **`saveCity`**
 This function takes the searched city name and displays it in the HTML page.
 It creates a `li` item and sets the text content to the user searched city name.
 Appends it in the section pre-made in the HTML.
 Adds event listeners to the `li`. Upon the click, all the functions in **Fetch all the data** and **Display the Data** is called.
 
 ### Use LocalStorage
 **`saveLocalStorage`**
 It is used to store an array in the localStorage. This list contains the name of all the cities searched. Elements (city names) are appended to this array in the `displayCurrentData` function.
 
 **`loadLocalStorage`**
 Gets an array from the local storage. It contains names for all the searched cities. `saveCity` is called for every elements of the array to display the names in the search history. Of no array is found, an empty array is created to keep track of the newly added city names.


 
 
