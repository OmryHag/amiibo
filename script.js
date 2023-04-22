const apiURL = 'https://www.amiiboapi.com/api/amiibo/'

const searchBar = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const searchButton = document.getElementById('search-button');
const resultContainer = document.querySelector('.result-container');
const results = document.querySelector('.results');

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
            resultContainer.innerHTML = `
                <h3>No Amiibo was found, please check your spelling</h3>
            `
        }
        const {amiibo} = data;
        console.log(amiibo);
        results.innerHTML = `
            ${amiibo.map(amiibo => {
                const {character, image} = amiibo;
                return (
                    `<li class="amiibo-item">
                        <img src="${image}" alt="${character}">
                    ${character}</li>`
                )
            }).join('')}
        `
    })
}