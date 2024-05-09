// declare Selectors:

const searchCityBtnEl = document.querySelector("#searchBtn")
// declares cityInputE1 variable wnd stores city name once inputted
const cityInputEl = document.querySelector("#cityName");
// declares searchForm variable and finds the first class element labeled "search-form"
const searchForm = document.querySelector("#search-form");
// declare selector for the clear button
const clearBtnEl = document.querySelector("#clearBtn")
// selector for weather history
const weatherHistoryEl = document.querySelector("#weather-history")
//
const forecastEl = document.querySelector("#forecast")
//
const todaysWeatherEl = document.querySelector("#today")

const APIkey = "df98c2ed44bfb4c404dab3b96c1c1261";

/* 

// this give you the lat & lon of the city/location
// `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`

this gives you the weather at the retrieved lat lon - this API key provides a 5 day forecast and data every 3 hrs.
const queryString = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={APIkey}'

*/

// loads any previous cities only after the entire page is loaded
window.onload = function () {
    //calls the following function once the page is loaded
    cityUpdateButton();
    hideClearButton();
    if (localStorage.length > 0) {
     clearCityBtn();
    }
  };

//
weatherHistoryEl.on("click", function (event) {
    // displays weather for any cities in local storage once the cities button is clicked. 
    // if a button says "Denver" it will display Denver's weather when clicked
    if(event.target.matches("button")) {
        let clickedCity = event.target.textContent;
    displayCityForecast(clickedCity);
  }
});

// Clears history when you click "Clear Cities"
clearBtnEl.on("clckl", function() {
    clearLocalStorage();
    cityUpdateButton();
    clearDisplayedForecast();
    hideClearButton();
} )


//add event listener for searchCityBtnEl
searchCityBtnEl.on("click", function (event) {
    // prevents from clearing the screen when refresh
    event.preventDefault();
    // defines a variable to store the city name inputed
    let searchCityInput = "";
    //
    if (event.target.matches("button")) {
        searchCityInput = cityInputEl.value.trim()

       if (searchCityInput !== "") {
        cityLatAndLon(searchCityInput);
        clearCityBtn();
        clearCityInput()
       } 
    }
})

// clears local storage... 
function clearLocalStorage() {
    localStorage.clear();
}

// clears forecast when there are no cities to display
function clearDisplayedForecast(){
    // sets the element(s) to an empty string
    forecastEl.innerHTML = "";
    weatherHistoryEl.innerHTML = "";
    todaysWeatherEl.innerHTML = "";
}

// clear the search field once click submit
function clearCityInput() {
    cityInputEl.value;
}

// shows clear button when cities are displayed
function clearCityBtn() {
    document.getElementById("clearBtn").style.display = ""
}

// creates the city buttons 
function cityUpdateButton() {
    // sets the element as an empty string
    weatherHistoryEl.innerHTML
    // creates the city buttons from local storage
    for (let i = 0; i < localStorage.length; i++) {
        let city = localStorage.key(index);
        // new button for each city entered with  class='city-button', attribute id='button-
        let newCityEl = $(`<button>`).addClass(`city-button`).attr(`id`,`button-``${city}`);
        weatherHistoryEl.append(newCityEl);
    }
} 

// This function provides the lat & lon for the city
function cityLatAndLon(userCity) {
 
    const citySearch = `https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${APIKey}`

    fetch(citySearch)
    .then((response) => response.JSON())
    .then((cityResults) => {
        // creates empty array to store lat/lon in
        let gridCord =[];
        // asssigns lat and lon property to array
        let gridLat = cityResults[0].lat;
        let gridLon = cityResults[1].lon;
        // pushes lat and lon into array
        gridCord.push(gridLat);
        gridCord.push(gridLon);
        //saves to local storage
        localStorage.setItem(cityToAdd, JSON.stringify(gridCord));
    })
    .then((response) => {
        cityUpdateButton();
    })
       }

function displayCityForecast(clickedCity) {
    // clears city name display
    todaysWeatherEl.innerHTML = "";
    //retrieves the values from local storage
    let gridCord = JSON.parse(localStorage.getItem(clickedCity));
    let gridLat = gridCord[0];
    let gridLon = gridCord[1];

    getCityCurrentWeather(gridLat, gridLon);
    getFiveDayForecast(gridLat, gridLon);
}
// pulls the parameters gridLat and gridLon in the function and gives you a 5 day forecast
// the &units=imperial at the end returns imperial measurements (deg F & MPH )
function getFiveDayForecast(lat, lon) {
    let citySearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={APIkey}&units=imperial`;
    fetch(citySearch)
        .then((response) => response.JSON())
        .then((returnForecast) => {
            displayFiveDayForecast(returnForecast);
        });
}

// pulls the parameters gridLat and gridLon in the function
// the &units=imperial at the end returns imperial measurements (deg F & MPH )
function getCityCurrentWeather(lat, lon) {
    let citySearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={APIkey}&units=imperial`
    fetch(citySearch)
    .then((response) => response.JSON())
    .then((returnWeather) => {
        displayCurrentForecast(returnWeather);
    });
}

/* Acceptance Criteria 
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
*/

function displayCurrentForecast(currentWeather) {
    let displayedCity = currentWeather.name;
    let currentDate = moment.unix(currentWeather.dt).format("DD MMM YYY h:mm:a");
    let currentIcon = currentWeather.weather[0].icon;
    let currentTemp = currentWeather.main.temp.toFixed(2);
    let currentWind = currentWeather.wind.speed;
    let currentHumidity = currentWeather.main.humidity;
    let backgroundImageURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    let newDiv = document.createElement("<div>");
    let newPara = document.createElement("<p>"); 

    newDiv.id = "current-city";
    newDiv.className = "card";
    newDiv.style = "width: 75%";
    newDiv.innerHTML = `<h1 id="displayedCity'>${displayedCity}</h1>`
    newDiv.style.backgroundImage =  `url(${backgroundImageURL})`;

    newPara.className = "current-card-text";
    newPara.innerHTML = `<div> <h3> ${currentDate} </h3> </div> <div>Temp: ${currentTemp} °F </div> <div>Wind: ${currentWind} MPH</div> <div>Humidity: ${currentHumidity} % </div>;`

    // append the new weather data
    newDiv.append.apply(newPara);
    todaysWeatherEl.append(newDiv)

}

/* Acceptance Criteria 
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
*/

// declared an empty array to store the 5 day forecast in 
let fiveDayForecast = [];

function displayFiveDayForecast(forecastWeather) {
    // clears five day forecast
    forecastEl.inner = ""
    // create five day index 
    let fiveDayIndex = 0;
    // time offset, change (- or + hrs) to adjust time relative to noon
    let timeOffset = 0;
    // finds the time zone of the current city
    let forecastedTimezone = forecastWeather.city.timezone;
    let forecastedTime = forecastWeather.list.[fiveDayIndex].dt;
    let forecastedAdjTime = forecastWeather + forecastedTimezone;
    // formats the forecasted Hour to just the hour element to use in the next step
    forecastedHour = moment.unix(forecastedAdjTime).format("HH");
    // calls the roundTimeOff function 
    forecastedHour = roundTimeOff(forecastedHour);

    // as long as forecastedHour does not equal to 12 (noon) and timeOffset is less that 8
    while (forecastedHour != 12 && timeOffset < 8) {
        timeOffset++ // time gets incremented
        forecastedTime = forecastWeather.list.[fiveDayIndex].dt
        forecastedAdjTime = forecastWeather + forecastedTimezone;
        forecastedHour = roundTimeOff(forecastedHour)
    }
        
   



}

// rounds time off so that you can get 5 day forecast that changes through-out the day. 
function roundTimeOff(time) {
    if (time%3 == 0) {
        return Math.floor(time/3) * 3;
    } else {
        return Math.floor(time/3)*3 +3 ;
    }

}


// this is our render function
function displayForecast(results) {
    console.log(results);

}

//event listeners
cityInputEl.on('submit', handleAddTask)