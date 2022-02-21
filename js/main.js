

let weather = {
    apiKey: "e81870f85fb21dd138c1e9f3b0dbed70",  // Hide API key in some sort of back end if I further this project



    fetchCityWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    

    fetchLocationWeather: function (position) {

        if ('geolocation' in navigator) {
            console.log('geolocation available');
            navigator.geolocation.getCurrentPosition(position =>  {
            lat = position.coords.latitude
            lon = position.coords.longitude

            fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
        });
        } else {
            console.log('geolocation not available');
        }

        
    },

    displayWeather: function(data) {
        
        const { name } = data;
        const { icon, description } = data.weather[0];
        const {temp,temp_min,temp_max, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name,icon,description,temp,temp_min,temp_max,humidity,speed)
        document.querySelector(".city").innerText = "Weather in: " + name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = "Forecast: " + description;
        document.querySelector(".temp").innerText = "Current: " + temp + " °F";
        document.querySelector(".temp_min").innerText = "Low: " + temp_min + " °F";
        document.querySelector(".temp_max").innerText = "High: " + temp_max + " °F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph"
    },

    searchCity: function () {
        this.fetchCityWeather(document.querySelector(".search-bar").value);
    },

    searchLocation: function () {
        this.fetchLocationWeather(document.querySelector(".sl"));
    }
};

document.querySelector(".sc button").addEventListener("click", function () { weather.searchCity();})

document.querySelector(".sl button").addEventListener("click", function () { weather.searchLocation();})
