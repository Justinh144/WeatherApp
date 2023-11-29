//var apiKey = '9b037e24285da23835017a3943bd34ba';
// var apiUrl = 'https://api.openweathermap.org/data/2.5/';

// Sets up an event listener for the ID 'search-form'
// It uses event for a function parameter and uses an input as the event
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // This variable retrieves the DOM element with the search-input ID
  // value accesses the value entered into the field
  // Trim removes and unnecessary text
  var city = document.getElementById('search-input').value.trim(); // Get the entered city name

  //  Retrives the name of the city entered into 'search-form'
  if (city) {
    // Fetches weather data for city
    getWeatherData(city);
    // Adds to search history
    addToSearchHistory(city);
    // This will be used later to display the city as a new element
    displaySearchHistory(city);
  } else {
    alert('No Entry');
  }
});

// Adds to the websites search history IE the local storage
function addToSearchHistory(city) {
  // Takes the entry from the local storage and converts it into a javasript object
  // Logical OR operator || If the parsed item returns false it will just show an emptry array
  // Does searchHistory corelate with search-history-list?
  var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  // Takes the city from the search input and uses push to add it to the end of an array
  searchHistory.push(city);
 // Converts the city entry from searchhistory and converts it into a JSON string
 // This makes it so searched cities will remain as objects even if the browser is closed 
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}


// This function takes a search history from the storage and
// converts it into an array before displaying it on the webpage
function displaySearchHistory() {
  // Retrieves the searchhistorylist DOM
  var historyList = document.getElementById('search-history-list');
  // This line clears the city search when the page is refreshed
  historyList.innerHTML = '';
  // Retrieves the item with the key 'searchHistory' from the local storage
  // It then parses the stored JSON string into a javascript array.
  var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
  // Loops over each city in the searchhistory array
   searchHistory.forEach(function(city) {
  // creates a new li element for each entry
    var listItem = document.createElement('ul');
  // Creates a new anchor element for each city
    var link = document.createElement('a');
  // Links the text to correlate with the appropriate city
    link.textContent = city;
  // Assigns a placeholder href that is clickable but won't go anywhere yet
    link.href = '#';
  // appends the the linked anchor element inside the parent 'li' element
    listItem.appendChild(link);
  // Appends the list item to the history-list
  // Ask about this part
    historyList.appendChild(listItem);

    // Add a click event listener that begins the displaysearchhistory function
    link.addEventListener('click', function(event) {
      event.preventDefault();
      getWeatherData(city);
    });
    });
}

displaySearchHistory();



// Function to fetch weather data with the city input we got from the submit form
function getWeatherData(city) {
  // Sets up the URLs to make API requests and is set to imperial so temp units show in fahrenheit
  var apiKey = '9b037e24285da23835017a3943bd34ba';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  var apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

  // Fetch retrieves the information from the URL
  fetch(apiUrl)
  // Checks for a response to the API request, if it returns null an error message is displayed
    .then(response => {
      if (!response.ok) {
        throw new Error('Error404');
      }
      return response.json();
    })
    // Continues the loop without the restrictions of an if or else
    .then(data => {
    // Updates the current weather info and applies to the variable 'data'
      updateCurrentWeather(data);

      // Does another search and applies the results to a second data2 variable
      // It does one search for the current weather and then a 
      // Second search for the 5 day forecast
      return fetch(apiUrl2);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error404');
      }
      return response.json();
    })
    .then(data2 => {
      
      updateForecast(data2);
    })
    .catch(error => {
      console.error('error404', error);
    });
}

// Function to update current weather information
function updateCurrentWeather(data) {
  var currentWeatherDiv = document.getElementById('current-weather');
// Sets up a new API call that will pull icons based on what the weather is like
var iconCode = data.weather[0].icon;
var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  // Updates the current weather div with info from the data variable
  // Uses jquery to update the cities name and a weather Icon
  // Line 133 new Date sets the current date and uses the template literal
  // toLocaleDateString ti display the date.
  // The rest of it uses API calls to get the corresponding weather information
  // and display them as <p> elements.
  currentWeatherDiv.innerHTML = `
    <h1>${data.name}</h1>
    <img src="${iconUrl}" alt="weather Icon">
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Temperature: ${data.main.temp}°F</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} MPH</p>
  `;
}

// This function is for the 5-day forecast. It works very similarily with some slight changes
function updateForecast(data2) {
  var forecastDiv = document.getElementById('forecast');
  // data2.list contains the array of forecast entries
  var forecastData = data2.list;
  // This variable will hold the result of the .reduce operation.
  // .Reduce reduces the array into a single value
  // acc is short for accumulator and holds the accumulated value across each iteration of the array
  // Entry is the current value being processed

  // Ask more about this line?
  var groupedByDay = forecastData.reduce((acc, entry) => {
    // Updates the current date by extracting the dt property and multiplies it by 1000
    var date = new Date(entry.dt * 1000).toLocaleDateString();
    // This conditional checks to see if the 'date' key exists in the acc object
    // If it does not it assigns the 'entry' to the acc[date] property. 
    // This creates a new property in the acc object where the key is the date
    if (!acc[date]) {
      acc[date] = entry;
    }
    return acc;
  }, {});

// Extracts the values from the 'groupedByDay' object
// and converts it into a uniqueForecast array
  var uniqueForecast = Object.values(groupedByDay);
  // Sets the forecast is being set to a string containing the HTML markup for the 5-day
  // line 172 uses .map to iterate over each forecast entry and
  // generates HTML content for each day's forecast
  // again we use the iconcode and iconurl for the weather's icons
  forecastDiv.innerHTML = `
    <h2>5-Day Forecast</h2>
     ${uniqueForecast.map(daily => {
      var iconCode = daily.weather[0].icon;
      var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
      return `
      <div class="forecast">
      <img src="${iconUrl}" alt="Weather Icon">
        <p>Date: ${new Date(daily.dt * 1000).toDateString()}</p>
        <p>Temperature: ${(daily.main.temp)}°F</p>
        
        <p>WInd Speed: ${daily.wind.speed} MPH</p>
        <p>Humidity: ${daily.main.humidity}%</p>
        
      </div>
    `}).join('')}
  </div>`;
} //  .join concatenates all the HTML strings generated by .map into a single string
// It removes the default commans between the generated elements.

