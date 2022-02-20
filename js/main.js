let weather = {
    apiKey: "e81870f85fb21dd138c1e9f3b0dbed70",  // Hide API key in some sort of back end if I further this project
    fetchCityWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    getLocation: function () {
        let opts = {
            enableHighAccuracy: true,
            timeout: 1000 * 10,
            mamimumAge: 1000 * 60 * 5,
        };
        navigator.geolocation.getCurrentPosition(weather.ftw, weather.wtf, opts);
    },

    // Error for geolocation
    wtf: (err) => { 
        console.log(err);
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
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = "Current: " + temp + " °F";
        document.querySelector(".temp_min").innerText = "Low: " + temp_min + " °F";
        document.querySelector(".temp_max").innerText = "High: " + temp_max + " °F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + "mph"
    },
    
    search: function () {
        this.fetchCityWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () { weather.search();

});

weather.init();