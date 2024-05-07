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



const APIkey = "df98c2ed44bfb4c404dab3b96c1c1261";
/* need to add to js page 

// this give you the lat & lon of the city/location
// `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`

this gives you the weather at the retrieved lat lon
const queryString = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

*/
// loads any previous cities
window.onload = function () {
    cityUpdateButton();
    hideClearButton();
    if (localStorage.length > 0) {
     clearCityBtn();
    }
  };

//
weatherHistoryEl.on("click", function (event) {
    if(event.target.matches("button")) {
        let clickedCity = event.target.textContent;
    displayCityForecast(clickedCity);
  }
});

// Clears history when you click "Clear Cities"
clearBtnEl.on("clckl", function() {
    clearLocalStorage();
    cityUpdateButton();
    clearForecast();
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

// clear the search field once click submit
function clearCityInput() {
    cityInputEl.value;
}

//
function clearCityBtn() {
    document.getElementById("clearBtn").style.display = ""
}

// This function provides the lat & lon for the city
function cityLatAndLon(userCity) {
    if(!userCity ) {
        userCity = "userCity";
    } else {
        alert("Please enter a City")
    }

    const citySearch = `https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${APIKey}`

    console.log(citySearch);

    fetch(citySearch)
    .then(function (citySearch) {
        if (!response.ok) {
            alert(response.status + " " + response.statusText);
            return;
        }
    return response.JSON();
    }).then(function (citySearchResult) {
        console.log(citySearchResult);
        resultText.textContent = query

        if(!citySearchResult.results.length) {
            console.log('No Results Found!');
            resultContainer.innerHTML = String.raw`<h3>No results found, search again!</h3>`;
        } else {
            resultText.textContent = "";
            for (const result of searchResult.results) {
                printResults(result);
            }
        }
    }).catch(function (error) {
        console.error(error);
        alert(error);
    })
}

function FormSubmitHandler(event) {

    // prevents from resting the page when submit is clicked
    event.preventDefault();

    // removes white space
    const cityInput = cityInputEl.value.trim();
    // for lat and long of city
    const cityLat = "cityL"

    // logs results to the screen
    console.log(cityInput);

    // checks to ensure input is not empty
    if (!cityInput) {
        alert("please enter a city");
        return;
    }
    // this puts the input into the search string to search
    const queryString = `./search-results.html?q=${cityInput}`;
    location.assign(queryString);
}

// event listener for when user clicks submit
searchForm.addEventListener('submit', handleSearchFormSubmit);

// extracts query parameters from curent URL and then calls a searchApi() function with those parameter
function getParams() {
    // splits the parameters into key/value pairs. "&" is used to separate the pairs
    const searchParams = document.location.search.split('&');
    // retrieve the value from each pair
    const cityLat = searchParams[0].split('=').pop();
    const cityLon = searchParams[1].split('=').pop();
    // searchApi function is called with the two values
    searchApi(cityLat, cityLon);
}

function searchApi(cityLat, cityLon) {
    //checks to ensure they inputs are not empty, if so posts a warning
    if(!cityLat && !cityLon) {
        cityLat = "cityLat";
        cityLon = "cityLon";
    } else {
        alert("Please enter Location Latitude and Longitude")
    }

    // this provides the weather forecast for the desired location at the inputted lat & lon
    const queryString = `https://api.openweathermap.org/data/2.5/forecast?lat=${citylat}&lon=${cityLon}&appid=${APIkey}`

    console.log(queryString);

    // initiates an asynchronous HTTP request to the apiUrl
    // fetches resources from the url and returns a promise}
    fetch(queryString)
    // this function verifies that we get a response, if not we get a message stating so
    .then(function (response) {
        if (!response.ok) {
            alert(response.status + " " + response.statusText);
            return;
        }

        return response.JSON();
    }).then(function (searchResult) {

        console.log(searchResult);

        resultText.textContent = query;


        if (!searchResult.results.length) {
            console.log('No Results Found!');
            resultContainer.innerHTML = String.raw`<h3>No results found, search again!</h3>`;
        } else {
            resultText.textContent = "";
            for (const result of searchResult.results) {
                displayForecast(result);
            }
        }
    }).catch(function (error) {
        console.error(error);
        alert(error);
    })
}

// this is our render function
function displayForecast(results) {
    console.log(results);

}

//event listeners
cityInputEl.on('submit', handleAddTask)