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
        <li>Temperature: ${planet.temperature} </li>
        <li>Moon: ${planet.moons} </li>
        <li>Diameter: ${planet.diameter} </li>
        <li>Distance from sun: ${planet.distanceFromSun} </li>
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