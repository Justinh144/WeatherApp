Hello, here is my submission for the weather app

It starts with a search form and an event listener using input as an event. Line 9 retrieves the search-input DOM and access the value entered. It uses .trim to remove white spaces. Line 15 checks to see if a city name was entered and then uses API calls established later in the code to get the weather data, add the entry to the search history and display it as a re-clickable element.

Line 28 starts the addToSearchHistory function. When an entry is sent to the local storage it then grabs and converts it into a javascript object. It has a logical OR operator that will not display anything if there no entries. Then it takes the search input and uses .push to add it to the end of an array. Lastly it takes the entries from the search history and converts it into a JSON string so they will remain even if the page is refreshed.

Line 42 displays searches as new <li> elements. First it retrieves the search-history-list DOM and then clears the city search when the page is refreshed. It retrieves the key 'searchHistory' from the local storge and parses the JSON string into a javascript array. It then loops through each city in the search history array (local storage) and creates a new <li> element along with an <a> element. link.textContent assign the cities name and then also puts in a blank href that will later be used. Line 62 appends this anchor inside its <li> and then appends it to historyList. Lastly it uses an eventListener to run the following getWeatherData function.

Line 80 This function is what runs the API calls to get the weather and forecast information. It does so twice with fetch and applies them to the data and data2 variables as I could not figure out how to get it to work with only one URL. &units=imperial on the end will have the temp display in fahrenheit.

Line 121 updates the weather info and also sets up a new API that will display the icons associated with the appropriate weather. It updates the current weather div and uses jquery to update the div with the weather and the various other information into <p> elements.

Line 145 does the 5-day forecast. data2 contains the forecast entries and then groups them into a daily bases and uses .reduce to reduce the array into a single value. Accumulator is abbreviated acc and holds the accumulated value of each iteration of the array. Entry is the current value being processed. It then takes the dt timestamp and multiplies it by 1000 which makes a readable date. I'm a little confused as to how this part works. Lastly it checks to see if the accumulated date has an entry and if not applies one. Lastly like 169 updates the groupedByDay variable and runs a simliar coding process to show the forecast for the next 5 days. Finally .join concatenates all the HTML strings generated by .map into a single string and removes white spaces.

I tried to get the site looking as close as possible to the img provided but felt it was better to spend my time figuring out the javascript portion of this assignment as we will be beginning our first group project tomorrow and decided to get this homework completed so I could be free to focus on that.

Thank you for your feedback!

Justin Hodges

https://justinh144.github.io/WeatherApp/

![image](https://github.com/Justinh144/WeatherApp/assets/146400241/551f1e0d-5144-432d-a83a-dfc1e96239c1)
