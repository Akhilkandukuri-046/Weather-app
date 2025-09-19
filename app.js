const apiKey = "c05b487be179580ae37a526b9e998114"; // Replace with your actual OpenWeatherMap API key

        const cityInput = document.getElementById('cityInput');
        const getWeatherBtn = document.getElementById('getWeatherBtn');
        const weatherInfo = document.getElementById('weatherInfo');
        const cityName = document.getElementById('cityName');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const weatherIcon = document.getElementById('weatherIcon');
        const wind = document.getElementById('wind');
        const errorMsg = document.getElementById('errorMsg');
        cityInput.addEventListener('keyup', event => {
   if (event.key === 'Enter') {
      getWeatherBtn.click();
   }
});


        getWeatherBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        });

        async function fetchWeather(city) {
            errorMsg.textContent = '';
            weatherInfo.style.display = 'none';

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error('City not found');
                }
                const data = await response.json();

                cityName.textContent = `${data.name}, ${data.sys.country}`;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
                description.textContent = data.weather[0].description;
                wind.textContent = `Wind: ${data.wind.speed} m/s`;
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                weatherIcon.alt = data.weather[0].description;

                weatherInfo.style.display = 'block';
            } catch (error) {
                errorMsg.textContent = error.message;
            }
        }

        // Optional: Fetch weather for a default city on load
        fetchWeather('New York');