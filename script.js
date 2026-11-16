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
        <li><img src="images/temperature.svg" alt="Temperature"> ${planet.temperature}</li>
        <li><img src="images/moon.svg" alt="moon"> ${planet.moons}</li>
        <li><img src="images/Diameter.svg" alt="Diameter Icon"> ${planet.diameter}</li>
        <li><img src="images/distance.svg" alt="Distance from Sun Icon"> ${planet.distanceFromSun}</li>
      </ul>
    `;
}

function showTable(list) {
    const groups = [
        { label: "Terrestrial Planets", type: "Terrestrial"},
        {
            label: "Jovian Planets",
            sub: [
                { label: "Gas Giants", type:"Gas Giant"},
                { label: "Ice Giants", type:"Ice Giant"},
            ],
        },
        { label:"Dwarf Planets", type:"Dwarf Planet"}
    ];
   const cells = (p) =>
    `<td>${p.name}</td><td>${p.mass}</td><td>${p.diameter}</td>`;

   let html = "";

   groups.forEach((g) => {
    if (g.sub) {
        const total = g.sub.reduce(
            (n, s) => n + list.filter((p) => p.type === s.type).length, 0
        );
        let first = true;
        g.sub.forEach((s) => {
            const items = list.filter((p) => p.type === s.type);
            items.forEach((p, i) => {
                html += "<tr>";
                if (first) {
                    html += `<td class="group" rowspan="${total}">${g.label}</td>`;
                    first = false
                }
                if (i === 0) {
                    html += `<td class="group" rowspan="${items.length}">${s.label}</td>`;
                }
                html += cells(p) + "</tr>";
            });
        });
    }else{ 
        const items = list.filter((p) => p.type === g.type);
        items.forEach((p, i) => {
            html += "<tr>";
            if (i === 0) {
                html += `<td class="group" rowspan="${items.length}" colspan="2">${g.label}</td>`;
            }
            html += cells(p) + "</tr>";
        });
    }
});
tableBody.innerHTML = html;
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

});