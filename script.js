const apiURL = 'https://www.amiiboapi.com/api/amiibo/'

// get HTML elements

const searchBar = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const searchButton = document.getElementById('search-button');
const resultContainer = document.querySelector('.result-container');
const results = document.querySelector('.results');
const result = document.querySelector('.result');


// event listeners

searchButton.addEventListener('click', searchAmiibo);
searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchAmiibo();
    }
})

function searchAmiibo() {
    results.innerHTML = '<div class="loading"></div>'
    results.style.display = 'block';
    result.style.display = 'none';
    const userInput = searchInput.value.trim();
    if (!userInput) {
        results.innerHTML = `<h3>Input must not be empty!</h3>`
        return;
    }
    
    // TODO: add loader
    fetch(apiURL + `?name=${userInput}`).then(response => response.json()).then(data => handleFetch(data))
}

function handleFetch(data) {
    if (data.hasOwnProperty('code') && data.code === 404) {
        results.innerHTML = `<h3>No Amiibo was found, please check your spelling</h3>`
        return;
    }

    const {amiibo} = data;
    const itemListHTML = `${amiibo.map((amiibo, index) => {
        const {character, image, amiiboSeries} = amiibo;
        return (
            `<li class="amiibo-item">
                <img src="${image}" alt="${character}"/>
                <span class="description-${index}">
                ${character} - ${amiiboSeries}
                </span>
            </li>`
        )
    }).join('')}`
    results.innerHTML = itemListHTML;

    addListenersToDescription(amiibo);
}

function addListenersToDescription(amiibo) {
    const itemDescriptions = document.querySelectorAll('[class*="description"]');

    Array.from(itemDescriptions).map(description => description.addEventListener('click', (event) => {
        const itemClassName = event.target.className;
        const itemIndex = itemClassName.split('-')[1];
        handleItemClick(amiibo[itemIndex]);
        results.style.display = 'none';
     }
    ))
}

function handleItemClick(item) {
    result.style.display = 'grid';
    const { image, character, gameSeries, amiiboSeries } = item;
    result.innerHTML = `
        <img src="${image}" alt="${character}"/>
        <span class="character-name">Character: ${character}</span>
        <span class="game-series">Game: ${gameSeries}</span>
        <span class="amiibo-series">Amiibo: ${amiiboSeries}</span>

    `
}