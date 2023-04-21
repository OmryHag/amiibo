const apiURL = 'https://www.amiiboapi.com/api/amiibo/'

const searchBar = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const searchButton = document.getElementById('search-button');
const resultArea = document.querySelector('.result-area');

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
        resultArea.innerHTML = `
            <h3>Input must not be empty!</h3>
        `
        return;
    }

    console.log(userInput);
    
    // TODO: add loader
    fetch(apiURL + `?name=${userInput}`).then(response => response.json()).then(data => console.log(data));
}