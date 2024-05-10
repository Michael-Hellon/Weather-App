// declare Selectors:

const searchCityBtnEl = document.querySelector("#search-form");
// declares cityInputE1 variable wnd stores city name once inputted
const cityInputEl = document.querySelector("#city-Name");
// declare selector for the clear button
const clearBtnEl = document.querySelector("#clear-button");
// selector for weather history
const weatherHistoryEl = document.querySelector("#weather-history");
// selector for forecast
const forecastEl = document.querySelector("#forecast");
// selector for todays Weather
const todaysWeatherEl = document.querySelector("#today");

// my API Key for openweathermap.org
const APIkey = "df98c2ed44bfb4c404dab3b96c1c1261";

// loads any previous cities only after the entire page is loaded
window.onload = function () {
    //calls the following function once the page is loaded
    cityUpdateButton();
    if (localStorage.length > 0) {
     clearCityBtn();
    }
  };

  console.log('test A-1');
//
weatherHistoryEl.addEventListener("click", function (event) {
    // displays weather for any cities in local storage once the cities button is clicked. 
    // if a button says "Denver" it will display Denver's weather when clicked
    console.log('test A-2');
    if(event.target.matches("button")) {
        let clickedCity = event.target.textContent;
    displayCityForecast(clickedCity);
  }
});
console.log('test a-3');
// Clears history when you click "Clear Cities"
clearBtnEl.addEventListener("click", function() {
    console.log('test B');
    clearLocalStorage();
    cityUpdateButton();
    clearDisplayedForecast();
}

)
console.log('test B-1')

//add event listener for searchCityBtnEl
searchCityBtnEl.addEventListener("click", function (event) {
    // prevents from clearing the screen when refresh
    event.preventDefault();
    // defines a variable to store the city name inputed
    let searchCityInput = "";
    console.log('test C');
    if (event.target.matches("button")) {
        searchCityInput = cityInputEl.value.trim()

       if (searchCityInput !== "") {
        cityLatAndLon(searchCityInput);
        clearCityBtn();
        clearCityInput();
       } 
    }
})
console.log('test B-2')

// // clears local storage... 
// function clearLocalStorage() {
//     // localStorage.clear();
// }

// clears forecast when there are no cities to display
function clearDisplayedForecast(){
    // sets the element(s) to an empty string
    forecastEl.innerHTML = "";
    weatherHistoryEl.innerHTML = "";
    todaysWeatherEl.innerHTML = "";
    console.log('test D')
}

// clear the search field once click submit
function clearCityInput() {
    cityInputEl.value = "";
    console.log('test E')
}

// shows clear button when cities are displayed
function clearCityBtn() {
    document.getElementById("clear-button").style.display = "";
    console.log('test E')

}

// creates the city buttons 
function cityUpdateButton() {
    // sets the element as an empty string
    weatherHistoryEl.innerHTML = "";
    // creates the city buttons from local storage
    console.log('test F-1')

    for (let i = 0; i < localStorage.length; i++) {
        let city = localStorage.key(i);

        // creates new elements with attributes - tried doing it like this, could not get it to work right. 
        // let newDivEl = $('<div>').addClass('card').attr('current-city', current-city.id).css({width: '75%','background-image': `url(${backgroundImageURL})`}).html(`<h1 id="displayedCity">${displayedCity}</h1>`);
        // let newParaEl = $("<p>").addClass('current-card-text').html(`<div> <h3> ${currentDate} </h3> </div> <div>Temp: ${currentTemp} °F </div> <div>Wind: ${currentWind} MPH</div> <div>Humidity: ${currentHumidity} % </div>;`); 

        // new button for each city entered with  class='city-button', attribute id='button-
        let newCityEl = document.createElement("button", (id = "TAG"));
        newCityEl.textContent = city;
        newCityEl.setAttribute("id", "button-" + city);
        newCityEl.className = "city-button";
        weatherHistoryEl.append(newCityEl);
        console.log('test F-2')

    }
} 

// This function provides the lat & lon for the city
function cityLatAndLon(userCity) {
 
    const citySearch = `https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${APIkey}`
    console.log('test G')

    fetch(citySearch)
    .then((response) => response.json())
    .then((cityResults) => {
        // creates empty array to store lat/lon in
        let gridCord =[];
        // asssigns lat and lon property to array
        let gridLat = cityResults[0].lat;
        let gridLon = cityResults[0].lon;
        // pushes lat and lon into array
        gridCord.push(gridLat);
        gridCord.push(gridLon);
        //saves to local storage
        localStorage.setItem(userCity, JSON.stringify(gridCord));
    })
    .then((response) => {
        cityUpdateButton();
        displayCityForecast(userCity);
    })
       }

function displayCityForecast(clickedCity) {
    console.log('test H-1')

    // clears city name display
    todaysWeatherEl.innerHTML = "";
    //retrieves the values from local storage
    let gridCord = JSON.parse(localStorage.getItem(clickedCity));
    let latCity = gridCord[0];
    let lonCity = gridCord[1];

    getCityCurrentWeather(latCity, lonCity);
    getFiveDayForecast(latCity, lonCity);
    console.log('test H-2')

}
// pulls the parameters gridLat and gridLon in the function and gives you a 5 day forecast
// the &units=imperial at the end returns imperial measurements (deg F & MPH )
function getFiveDayForecast(lat, lon) {
    console.log('test I-1')

    let cityForecastSearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
   
    fetch(cityForecastSearch)
        .then((response) => response.json())

        .then((returnForecast) => {
            displayFiveDayForecast(returnForecast);
            console.log('test I-3')

        });
}

// pulls the parameters gridLat and gridLon in the function
// the &units=imperial at the end returns imperial measurements (deg F & MPH )
function getCityCurrentWeather(lat, lon) {
       let cityWeatherSearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
    fetch(cityWeatherSearch)
    .then((response) => response.json())
    .then((returnWeather) => {
        console.log('returnWeather', returnWeather);
        displayCurrentForecast(returnWeather.list[0]);
    });
    
}

/* Acceptance Criteria 
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
*/

function displayCurrentForecast(currentWeather) {
    let displayedCity = currentWeather.name;
    console.log("displayedCity", displayedCity);
    let currentDate = moment.unix(currentWeather.dt).format("DD MMM YYY h:mm:a");
    let currentTemp = (currentWeather.main.temp).toFixed(2);
    let currentWind = currentWeather.wind.speed;
    let currentHumidity = currentWeather.main.humidity;
    let currentIcon = currentWeather.weather[0].icon;
    let backgroundImageURL = `http://openweathermap.org/img/wn/${currentIcon}@2x.png`;
    let newDivEl = document.createElement("div");
    let newParaEl = document.createElement("p");
    console.log('Current Weather', currentWeather);
    
    // creates new elements with attributes - tried doing it this way. it wouldn't work
    // newDivEl = $('<div>').addClass('card').attr('current-city', current-city.id).css({width: '75%','background-image': `url(${backgroundImageURL})`}).html(`<h1 id="displayedCity">${displayedCity}</h1>`);
    // newParaEl = $("<p>").addClass('current-card-text').html(`<div> <h3> ${currentDate} </h3> </div> <div>Temp: ${currentTemp} °F </div> <div>Wind: ${currentWind} MPH</div> <div>Humidity: ${currentHumidity} % </div>;`); 

    newDivEl.id ='current-city';
    newDivEl.className = 'card';
    newDivEl.style = 'width: 75%';
    newDivEl.innerHTML = `<h1 id="displayedCity">${displayedCity}</h1>`;
    newDivEl.style.backgroundImage = `url(${backgroundImageURL})`

    newParaEl.className = "today-card-text";
    newParaEl.innerHTML = `<div> <h3> ${currentDate} </h3> </div> <div>Temp: ${currentTemp} °F </div> <div>Wind: ${currentWind} MPH</div> <div>Humidity: ${currentHumidity} % </div>`;
  
    // append the new weather data
    newDivEl.append(newParaEl);
    todaysWeatherEl.append(newDivEl)

    console.log('test Final');
}

/* Acceptance Criteria 
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
*/

// declared an empty array to store the 5 day forecast in 
let fiveDayForecast = [];

function displayFiveDayForecast(forecastWeather) {
    // clears five day forecast
    forecastEl.innerHTML = ""
    // create five day index 
    let fiveDayIndex = 0;
    // time offset, change (- or + hrs) to adjust time relative to noon
    let timeOffset = 0;
    // finds the time zone of the current city
    let forecastedTimezone = forecastWeather.city.timezone;
    console.log("forecastWeather.list",forecastWeather.city.timezone);

    // let forecastedTime = forecastWeather.list.fiveDayIndex.dt;
    let forecastedAdjTime = forecastWeather + forecastedTimezone;
    // formats the forecasted Hour to 24hr clock to just the hour element to use in the next step 
    forecastedHour = moment.unix(forecastedAdjTime).format("HH");
    // calls the roundTimeOff function 
    forecastedHour = roundTimeOff(forecastedHour);

    // as long as forecastedHour does not equal to 12 (noon) and timeOffset is less that 8
    while (forecastedHour != 12 && timeOffset < 8) {
        timeOffset++ // time gets incremented
        let forecastedTime = forecastWeather.list[fiveDayIndex].dt
        forecastedAdjTime = forecastWeather + forecastedTimezone;
        console.log("forecastedTime", forecastedTime);
        // formats the forecasted Hour to 2 digits (includes the 0 prior to 1000 hrs) to use in the next step 
        forecastedHour = moment.unix(forecastedAdjTime).format("KK");
        forecastedHour = roundTimeOff(forecastedHour);
    }
    // loop thru forecastWeather and add 8hrs
    for (let index = timeOffset; index < forecastWeather.list.length; index+8 ) {
        fiveDayForecast[fiveDayIndex] = forecastWeather.list[timeOffset]

        let forecastedDate = moment.unix(forecastWeather.list[index].dt).format("DD MMM YYYY"); 
        let forecastedTemp = (fiveDayForecast[fiveDayIndex].main.temp).toFixed(2);
        let forecastedWind = fiveDayForecast[fiveDayIndex].wind.speed;
        let forecastedHumidity = fiveDayForecast[fiveDayIndex].main.humidity;
        let forecastedIcon = fiveDayForecast[fiveDayIndex].weather[0].icon
        let newDivEl = document.createElement("div");
        let newParaEl = document.createElement("p");
        let newDivTwoEl = document.createElement("div");
        let newImgEl = document.createElement("img");

        // creates new elements with attributes - tried doing it this way. it wouldn't work
        // let newDivEl = $('<div>').addClass('card').attr(`day + (fiveDayIndex + 1)`, day.id).css({width: '15%','background-image': `url(${backgroundImageURL})`}).html(`<h3 class="date-header">${forecastedDate} </h3>`);
        // let newImgEl = $('<img>').addClass('card-img-top').attr(`src = http://openweathermap.org/img/wn/${forecastedIcon}@2x.png`,'alt = Weather Icon');
        // let newDivTwoEl =$('<div>').addClass('card-body')
        // let newParaEl = $("<p>").addClass('card-text').html(`<div>Temp: ${forecastedTemp} °F </div> <div>Wind: ${forecastedWind} MPH</div> <div>Humidity: ${forecastedHumidity} %</div>`); 
      
        newDivEl.id = "day" + (fiveDayIndex + 1);
        newDivEl.className = "card";
        newDivEl.style = "width: 15%";
        newDivEl.innerHTML = `<h3 class="date-header">${forecastedDate} </h3>`;
    
        newImgEl.className = "card-img-top";
        newImgEl.src = `http://openweathermap.org/img/wn/${forecastedIcon}@2x.png`;
        newImgEl.alt = "Weather Icon";
    
        newDivTwoEl.className = "card-body";
    
        newParaEl.className = "card-text";
        newParaEl.innerHTML =`<div>Temp: ${forecastedTemp} °F </div> <div>Wind: ${forecastedWind} MPH</div> <div>Humidity: ${forecastedHumidity} %</div>`;

        // finally append everything...
        newDivEl.append(newImgEl);
        newDivTwoEl.append(newParaEl);
        newDivEl.append(newDivTwoEl);

        forecastEl.append(newDivEl);

        fiveDayIndex++
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
