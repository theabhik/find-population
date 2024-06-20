let countriesList = [];

// Function to create and append country elements
function createappendresults(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    document.getElementById("resultCountries").appendChild(countryEl);

    let countryFlagEl = document.createElement("img");
    countryFlagEl.src = country.flag;
    countryFlagEl.classList.add("country-flag", "mt-auto", "mb-auto");
    countryEl.appendChild(countryFlagEl);

    let countryInfoEl = document.createElement("div");
    countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(countryInfoEl);

    let countryNameEl = document.createElement("p");
    countryNameEl.textContent = country.name;
    countryNameEl.classList.add("country-name");
    countryInfoEl.appendChild(countryNameEl);

    let countryPopulationEl = document.createElement("p");
    countryPopulationEl.textContent = country.population;
    countryPopulationEl.classList.add("country-population");
    countryInfoEl.appendChild(countryPopulationEl);
}

// Function to display search results
function displaysearchresults(countriesList) {
    document.getElementById("resultCountries").textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputValue)) {
            console.log(countryName);
            createappendresults(country);
        }
    }
}

// Fetch countries data when the page loads
function fetchCountriesData() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById("resultCountries").classList.add("d-none");

    fetch(url, options)
        .then(function(res) {
            return res.json();
        })
        .then(function(jsondata) {
            document.getElementById("spinner").classList.add("d-none");
            document.getElementById("resultCountries").classList.remove("d-none");
            countriesList = jsondata;
            displaysearchresults(countriesList); // Display all countries initially
        });
}

// Event listener for the search input
document.getElementById("searchInput").addEventListener("keyup", function(event) {
    searchInputValue = event.target.value;
    displaysearchresults(countriesList);
});

// Fetch countries data when the page loads
fetchCountriesData();

let searchInputValue = "";