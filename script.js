document.addEventListener("DOMContentLoaded", function () {
    const countryCards = document.getElementById("country-cards");

    // Function to fetch country data from Rest countries API
    async function fetchCountryData() {
        try {
            const response = await fetch("https://restcountries.com/v3/all");
            const countries = await response.json();

            // Loop through the countries and create Bootstrap cards
            countries.forEach((country) => {
                const card = document.createElement("div");
                card.className = "card col-lg-4 mb-3";

                const cardBody = document.createElement("div");
                cardBody.className = "card-body";

                cardBody.innerHTML = `
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">Capital: ${country.capital}</p>
                    <p class="card-text">Region: ${country.region}</p>
                    <p class="card-text">Country Code: ${country.cca2}</p>
                    <p class="card-text">Latitude/Longitude: ${country.latlng.join(", ")}</p>
                    <img src="${country.flags.png}" class="img-fluid" alt="${country.name.common} Flag">
                `;

                card.appendChild(cardBody);
                countryCards.appendChild(card);

                // Fetch weather data for the country
                fetchWeatherData(country);
            });
        } catch (error) {
            console.error("Error fetching country data:", error);
        }
    }

    // Function to fetch weather data from OpenWeatherMap API
    async function fetchWeatherData(country) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=YOUR_API_KEY`
            );
            const weatherData = await response.json();

            // You will need to replace 'YOUR_API_KEY' with your OpenWeatherMap API key.

            // Display weather data as needed
            const card = document.querySelector(`[data-country="${country.name.common}"] .card-body`);
            card.innerHTML += `
                <p class="card-text">Weather: ${weatherData.weather[0].description}</p>
                <p class="card-text">Temperature: ${weatherData.main.temp}°C</p>
            `;
        } catch (error) {
            console.error("Error fetching weather data for", country.name.common, ":", error);
        }
    }

    // Call the function to fetch country data
    fetchCountryData();
});
