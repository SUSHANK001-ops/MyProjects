// const apiKey = "187ee4aa41f22aea42c276bfd339153f";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
// const searchBox = document.querySelector(".search input");
// const searchBtn = document.querySelector(".search button");
// const weatherIcon = document.querySelector(".weather-icon");

// // Function to convert Unix timestamp to 12-hour time format
// function convertUnixTo12Hour(unixTimestamp) {
//     const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12; // Convert to 12-hour format
//     hours = hours ? hours : 12; // Handle midnight (0 hours)
//     minutes = minutes < 10 ? '0' + minutes : minutes; // Pad minutes with leading zero if necessary
//     return `${hours}:${minutes} ${ampm}`;
// }

// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
//     var data = await response.json();
    
//     if (response.status == 404) {
//         document.querySelector(".error").style.display = "block";
//         document.querySelector(".weather").style.display = "none";
//     } else {
//         console.log(data);

//         // Display general weather information
//         document.querySelector(".city").innerHTML = data.name;
//         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//         document.querySelector(".feel").innerHTML = `Feels like: ${Math.round(data.main.feels_like)}°C`;
//         document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//         document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
//         document.querySelector(".visibility").innerHTML = data.visibility + "m";
//         document.querySelector(".condition").innerHTML = data.weather[0].main;

//         // Convert and display sunrise and sunset times
//         const sunriseTime = convertUnixTo12Hour(data.sys.sunrise);
//         const sunsetTime = convertUnixTo12Hour(data.sys.sunset);
//         document.querySelector(".sunrise").innerHTML = `Sunrise: ${sunriseTime}`;
//         document.querySelector(".sunset").innerHTML = `Sunset: ${sunsetTime}`;

//         // Set the correct weather icon
//         if (data.weather[0].main == "Clouds") {
//             weatherIcon.src = "images/clouds.png";
//         } else if (data.weather[0].main == "Clear") {
//             weatherIcon.src = "images/clear.png";
//         } else if (data.weather[0].main == "Rain") {
//             weatherIcon.src = "images/rain.png";
//         } else if (data.weather[0].main == "Snow") {
//             weatherIcon.src = "images/snow.png";
//         } else if (data.weather[0].main == "Drizzle") {
//             weatherIcon.src = "images/drizzle.png";
//         } else if (data.weather[0].main == "Mist") {
//             weatherIcon.src = "images/mist.png";
//         }

//         // Show the weather information
//         document.querySelector(".weather").style.display = "block";
//         document.querySelector(".error").style.display = "none"; // Hide error if successful
//     }
// }

// // Event listener for the search button
// searchBtn.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });

// // Event listener for pressing the Enter key inside the search box
// searchBox.addEventListener("keydown", function(event) {
//     if (event.key === "Enter" || event.keyCode === 13) {
//         checkWeather(searchBox.value);
//     }
// });

const apiKey = "65f4fbfdd2dc4368b1885bce52fbd9d2";
const apiUrl = "https://api.weatherbit.io/v2.0/current?";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


// Function to check the weather using Weatherbit API
async function checkWeather(city) {
    const response = await fetch(apiUrl + `&key=${apiKey}&city=${city}`);
    const data = await response.json();

    if (!data || data.error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const weatherData = data.data[0];  // Extract the weather data
        console.log(weatherData);

        // Display general weather information
        document.querySelector(".city").innerHTML = weatherData.city_name;
        document.querySelector(".temp").innerHTML = Math.round(weatherData.temp) + "°C";
        document.querySelector(".feel").innerHTML = `Feels like: ${Math.round(weatherData.app_temp)}°C`;
        document.querySelector(".humidity").innerHTML = weatherData.rh + "%";
        document.querySelector(".wind").innerHTML = weatherData.wind_spd + "km/hr";
        document.querySelector(".visibility").innerHTML = weatherData.vis + "km";
        document.querySelector(".condition").innerHTML = weatherData.weather.description;

        // Weather icons are different in Weatherbit, so map them accordingly
        const iconCode = weatherData.weather.icon;
        weatherIcon.src = `https://www.weatherbit.io/static/img/icons/${iconCode}.png`;

    
        // Show the weather information
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none"; // Hide error if successful
    }
}

// Event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Event listener for pressing the Enter key inside the search box
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        checkWeather(searchBox.value);
    }
});
