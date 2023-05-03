const form = document.getElementById("myForm");
const screenText = document.getElementById("screenText");
const degreeBtns = document.querySelectorAll(".degree");

degreeBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const btnData = btn.getAttribute('data-val');
        console.log()
        currentBtn = btnData;
        updateScreenText();
    })  
})

const key = '523bf92de349436bab3140114230305';
var currentTemperatureInCelsius = 0;
var currentTemperatureInFahrenheit = 0;
var currentBtn = 'celsius';
var currentLocation = 'london';





// https://api.weatherapi.com/v1/current.json?key=523bf92de349436bab3140114230305&q=london
async function getWeatherData(location) {
    const url = 'http://api.weatherapi.com/v1/current.json?key=' + key + '&q=' + location;
    const response = await fetch(url, {mode : 'cors'});
    const responseData = await response.json();
    // console.log(responseData);
    // currentTemperatureInCelsius = responseData.current.temp_c;
    // currentTemperatureInFarenheit = responseData.current.temp_f;
    // console.log(currentTemperatureInCelsius, currentTemperatureInFahrenheit);
    return [responseData.current.temp_c, responseData.current.temp_f];
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log(data);
    currentLocation = data.location;
    run(data.location);
    e.preventDefault();
    e.target.reset();
}

async function run(location) {
    [currentTemperatureInCelsius, currentTemperatureInFahrenheit] = await getWeatherData(location);
    updateScreenText();
}

function updateScreenText() {
    if(currentBtn == 'celsius') {
        screenText.innerText = currentTemperatureInCelsius + ` degree Celsius in ${currentLocation}`;
    }else {
        screenText.innerText = currentTemperatureInFahrenheit + ` degree Fahrenheit in ${currentLocation}` ;
    }
}

run(currentLocation);