const API_URL = "https://anurella.github.io/json/planet.json";

async function fetchPlanets() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const planets = await response.json();
        console.log(planets);
    } catch (error) {
        console.error("Error fetching planets:", error);
    }
}

getPlanets();