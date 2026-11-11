const API_URL = "planets.json";

const card = document.getElementById("planet-card");
const tableBody = document.getElementById("planets-table");
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const errorMessage = document.getElementById("error-message");

let planets = [];

async function fetchPlanets() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Request failed: " + response.status);
        }
        planets = await response.json();
        showPlanet(planets.find((p) => p.name === "Earth") || planets[0]);
        showTable(planets);
    } catch (error) {
        console.error("Could not load planets:", error);
        card.textContent = "Could not load planets data.";
    }
}
 function showPlanet(planet) {
    card.innerHTML = `
        <img src="${planet.image}" alt="${planet.name}" width="120">
        <div>
        <h2>${planet.name}</h2>
        <p class= "type">${planet.type}</p>
        <p>${planet.description}</p>
        </div>
        <ul class="main-stats">
         <li><span>Gravity</span> ${planet.gravity}</li>
         <li><span>Mass</span> ${planet.mass}</li>
         <li><span>Period</span> ${planet.period}</li>
       </ul>
       <ul class= "extra-stats">
        <li><img src="images/planets/Temperature icon.svg" alt="Temperature Icon" width="20" height="20"> ${planet.temperature}</li>
        <li><img src="images/planets/path.svg" alt="Moon Icon" width="20" height="20"> ${planet.moons}</li>
        <li><img src="images/planets/Diametersvg" alt="Diameter Icon" width="20" height="20"> ${planet.diameter}</li>
        <li><img src="images/planets/vector.svg" alt="Distance from Sun Icon" width="20" height="20"> ${planet.distanceFromSun}</li>
      </ul>
    `;
}

function showTable(list) {
    tableBody.innerHTML = list
     .map(
        (p) => `
        <tr>
            <td>${p.type}</td>
            <td>${p.name}</td>
            <td>${p.mass}</td>
            <td>${p.diameter}</td>
        </tr>`
     )
     .join("");
} 

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim().toLowerCase();
    const found = planets.find((p) => p.name.toLowerCase() === name);
    if (found) {
        errorMessage.hidden = true;
        showPlanet(found);
    } else {
        errorMessage.hidden = false;
    }
});
fetchPlanets();

const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = dark ? "light" : "dark";
    toggle.textContent = dark ? "Dark🌙" : "Light☀️";
    Below is a comparative table of major planets in our solar system. The data highlights key physical properties used by astronomers and researchers worldwide.
});