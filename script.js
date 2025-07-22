import { API_CONFIG } from './config.js';

const AccessKey = API_CONFIG.UNSPLASH_ACCESS_KEY;

const formEL = document.querySelector("form");
const inputEl = document.querySelector("#search-input"); 
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.querySelector("#show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?query=${inputData}&page=${page}&client_id=${AccessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Image";
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description || "View Image";

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper); // ✅ Add to search results container
    });

    page++;
    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

// Event listeners - add these outside the function
formEL.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", () => {
    searchImages();
});