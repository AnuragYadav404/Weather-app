const form = document.getElementById("myForm");
const weatherImg = document.getElementById("weather-image");

const text = document.getElementById("text");
const celsius = document.getElementById("celsiusText");
const celsiusFeelsLike = document.getElementById("celsiusFeelsLike");
const fahren = document.getElementById("fahrenText");
const fahrenFeelsLike = document.getElementById("fahrenFeelsLike");
const loc = document.getElementById("loc");
// console.log(loc)

const key = '523bf92de349436bab3140114230305';

// https://api.weatherapi.com/v1/current.json?key=523bf92de349436bab3140114230305&q=london
async function getWeatherData(location) {
    try {
        const url = 'https://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + location;
        const response = await fetch(url, {mode : 'cors'});
        if(response.status == 400) {
            handleError('No Matching location found.')
        }else {
        const responseData = await response.json();
        // console.log(responseData);
            // if(responseData.hasOwnProperty('error')) {
            //     handleError(responseData.error.message);
            // }else {
                
            // }
        updateDisplay(responseData.location.name, responseData.current.condition.text, responseData.current.temp_c, responseData.current.feelslike_c,responseData.current.temp_f, responseData.current.feelslike_f,'https:' + responseData.current.condition.icon);
    }
    } catch (err) {
        // console.log("There was an error retrieving weather data. Please try again later.");
    }
    
}

function updateDisplay(location,message, temp_c, feels_c, temp_f, feels_f, url) {
    loc.innerText = location;
    text.innerText = message;
    celsius.innerText  = "Celsius temperature: " + temp_c;
    celsiusFeelsLike.innerText = "Celsius Feels like: " + feels_c;
    fahren.innerText  = "Fahrenheit temperature: " + temp_f;
    fahrenFeelsLike.innerText =  "Fahrenheit Feels like: " + feels_f;
    if(weatherImg.classList.contains("disable")) {
        weatherImg.classList.remove("disable");
    }
    weatherImg.src = url;
}

function handleError(message) {
    loc.innerText = 'N/A';
    text.innerText = message;
    celsius.innerText  = 'N/A';
    celsiusFeelsLike.innerText = 'N/A'
    fahren.innerText  = 'N/A';
    fahrenFeelsLike.innerText = 'N/A'
    weatherImg.className = "disable";
}


form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    getWeatherData(data.location);
    e.preventDefault();
    e.target.reset();
}

async function intialRun() {
    await getWeatherData('london');
}

intialRun();