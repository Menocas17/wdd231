const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector ('#weather-icon');
const capDescription = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.74990967784122&lon=6.642590450429095&appid=e4ecd0c975a7d843f411d8205c8a8aa3&units=metric'

const apiFetch = async () => {
    try {
        const weatherResponse = await fetch(url)
        if(!weatherResponse.ok) {
            throw new Error (`Response status: ${weatherResponseesponse.status}`)
        }

        const weatherData = await weatherResponse.json();
        return weatherData;
    }
    catch (error){
        console.log(error.message);
    }
}

function displayResults (data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    weatherIcon.setAttribute('atl', 'The current weather icon')
    capDescription.textContent= `${data.weather[0].description}`
}

const displayWeather = async () => {
    const weatherData = await apiFetch();

    displayResults(weatherData);
} 

displayWeather()

