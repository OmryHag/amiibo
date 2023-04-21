const apiURL = 'https://www.amiiboapi.com/api/'

const searchBar = document.querySelector('.search-box');
const searchInput = document.querySelector('.search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', searchAmiibo);
searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        searchAmiibo();
    }
})

function searchAmiibo() {
    console.log('pressed');
}