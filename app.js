const API_KEY = '13bf3b5fcd0a934dc4422bd5db13cb89'; // Replace with your actual API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        displayError("Please enter a city name.");
    }
});

function fetchWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => displayError(error.message));
}

function displayWeather(data) {
    document.getElementById('error-message').textContent = "";
    document.getElementById('city-name').textContent = `Weather in ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Condition: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('city-name').textContent = "";
    document.getElementById('temperature').textContent = "";
    document.getElementById('description').textContent = "";
    document.getElementById('humidity').textContent = "";
}