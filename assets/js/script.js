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

this gives you the weather at the retrieved lat lon
const queryString = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

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
    .then(cityResults) => {
        // creates empty array to store lat/lon in
        let gridCord =[];
        // asssigns lat and lon property to array
        let gridLat = cityResults[0].lat;
        let GridLon = cityResults[1].lon;
        // pushes lat and lon into array
        gridCord.push(gridLat);
        gridCord.push(GridLon);
        //saves to local storage
        localStorage.setItem(cityToAdd, Json.strinify(gridCord));
    }
    .then((response) => {
        cityUpdateButton();
    })
       }


// this is our render function
function displayForecast(results) {
    console.log(results);

}

//event listeners
cityInputEl.on('submit', handleAddTask)