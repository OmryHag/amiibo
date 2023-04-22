const apiURL = 'https://www.amiiboapi.com/api/amiibo/'

// get HTML elements

const searchBar = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const searchButton = document.getElementById('search-button');
const resultContainer = document.querySelector('.result-container');
const results = document.querySelector('.results');


// event listeners

searchButton.addEventListener('click', searchAmiibo);
searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchAmiibo();
    }
})

function searchAmiibo() {
    const userInput = searchInput.value.trim();
    if (!userInput) {
        resultContainer.innerHTML = `
            <h3>Input must not be empty!</h3>
        `
        return;
    }

    console.log(userInput);
    
    // TODO: add loader
    fetch(apiURL + `?name=${userInput}`).then(response => response.json()).then(data => {
        if (data.hasOwnProperty('code') && data.code === 404) {
            results.innerHTML = `
                <h3>No Amiibo was found, please check your spelling</h3>
            `
        }
        const {amiibo} = data;
        const itemListHTML = `
        ${amiibo.map((amiibo, index) => {
            const {character, image, amiiboSeries} = amiibo;
            return (
                `<li class="amiibo-item">
                    <img src="${image}" alt="${character}">
                    <span class="description-${index}">
                    ${character} - ${amiiboSeries}
                    </span>
                </li>`
            )
        }).join('')}
    `
        console.log(amiibo);
        results.innerHTML = itemListHTML;

        const itemDescriptions = document.querySelectorAll('[class*="description"]');

        Array.from(itemDescriptions).map(description => description.addEventListener('click', (event) => handleItemClick(event)))
    })
}

function handleItemClick(event) {
    const itemDescription = 
    console.log(event.target.className);
}