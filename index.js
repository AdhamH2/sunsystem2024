// Base API URL and API key
const apiBaseUrl = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com';
const apiKey = 'solaris-2ngXkR6S02ijFrTP'; 

let allBodies = []; // Global variable to store all fetched bodies

// Event listener for loading all planets after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchBodies(); // Fetch data of solar bodies from API
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', handleSearchInput); // Trigger navigation only when Enter is pressed
    searchInput.addEventListener('input', filterBodies); // Trigger filtering as the user types
});

// Function to fetch solar bodies from API
async function fetchBodies() {
    try {
        const response = await fetch(`https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies`, {
            method: 'GET',
            headers: { 'x-zocom': 'solaris-2ngXkR6S02ijFrTP'}
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        allBodies = await response.json(); // Save all fetched bodies in the global variable
        displayBodies(allBodies); // Display all bodies initially
    } catch (error) {
        console.error("Error fetching the solar system bodies:", error.message);
        document.getElementById('bodiesContainer').innerText =
            "Error: Could not fetch data. Please try again later.";
    }
}

// Function to display solar bodies in the container
function displayBodies(bodies) {
    const container = document.getElementById('bodiesContainer');
    container.innerHTML = ''; // Clear the container before adding new content

    if (bodies.length === 0) {
        container.innerHTML = '<p>No planets found.</p>';
        return;
    }

    bodies.forEach(body => {
        // Create a card element for each body
        const card = document.createElement('div');
        card.classList.add('card');

        // Add details of each body to the card
        card.innerHTML = `
            <h2>${body.name} (${body.latinName})</h2>
            <p>${body.desc}</p>
            <p><strong>Type:</strong> ${body.type}</p>
            <p><strong>Circumference:</strong> ${body.circumference} km</p>
            <p><strong>Distance from Sun:</strong> ${body.distance} km</p>
            <p><strong>Day Temperature:</strong> ${body.temp.day}°C, <strong>Night Temperature:</strong> ${body.temp.night}°C</p>
            <p><strong>Moons:</strong> ${body.moons.length > 0 ? body.moons.join(', ') : 'No moons'}</p>
        `;

        container.appendChild(card); // Add the card to the container
    });
}

// Function to handle the search input when Enter is pressed
function handleSearchInput(event) {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim(); // Get and sanitize the input value

    if (event.key === 'Enter') { // Check if the key pressed is Enter
        // Redirect to corresponding planet or sun page based on search term
        const planets = [
            'mercury', 'venus', 'earth', 'mars', 'jupiter',
            'saturn', 'uranus', 'neptune', 'sun', 'index'
        ]; // Array of valid planet names (include "solen" for the Sun)

        if (planets.includes(searchTerm)) {
            window.location.href = `${searchTerm}.html`; // Redirect to respective HTML page
        } else {
            alert('Invalid input! Please enter a valid planet name or "sun".'); // Show alert for invalid input
        }
    }
}


// Function to filter bodies based on user input
function filterBodies() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim(); // Get and sanitize the input value

    // Filter bodies based on name or Latin name
    const filteredBodies = allBodies.filter(body =>
        body.name.toLowerCase().includes(searchTerm) ||
        body.latinName.toLowerCase().includes(searchTerm)
    );

    displayBodies(filteredBodies); // Display only the filtered bodies
}
