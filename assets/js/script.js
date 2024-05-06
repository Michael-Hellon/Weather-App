// declare Selectors:
// declares searchForm variable and finds the first class element labeled "search-form"
const searchForm = document.querySelector("#search-form");
const cityInputEl = document.querySelector("#cityName");


const APIkey = "df98c2ed44bfb4c404dab3b96c1c1261";
/* need to add to js page 
const queryString = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'

*/

function FormSubmitHandler(event) {

    // prevents from resting the page when submit is clicked
    event.preventDefault();

    // removes whit
    const cityInput = cityInputEl.value.trim();
    // for lat and long of city
    const cityLat = c

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
    const queryString = 'https://api.openweathermap.org/data/2.5/forecast?lat=${citylat}&lon=${cityLon}&appid=${APIkey}'

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

        return response.json();
    }).then(function (searchResult) {

        console.log(searchResult);

        resultText.textContent = query;

        if (!searchResult.results.length) {
            console.log('No results found!');
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

