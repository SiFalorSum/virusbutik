/* DARKMODE FUNCTIONS AND LISTENERS */

let body = document.getElementById('body');

function toggleDarkMode() {
    window.localStorage.setItem('darkmode', body.classList.toggle('darkmode')); //toggle returns true or false
}

function darkModeListener() {
    let isDarkMode = (window.localStorage.getItem('darkmode') === 'true');
    body.classList.toggle('darkmode', isDarkMode); //equivalent to 'add' if true, 'remove' if false
}

document.getElementById('darkmode-toggle').addEventListener('click', e => toggleDarkMode());
document.addEventListener('DOMContentLoaded', e => darkModeListener());
window.addEventListener('storage', e => darkModeListener());

/* PRODUCTS - LOAD, RENDERING, CART */

async function fetchJSON(path, responseProcessorFunction) {
    try {
        let response = await fetch(path);
        if (!response.ok) 
            throw new Error(`Unable to load data from ${response.url}` 
            + `\nStatus: ${response.status} - "${response.statusText}"`);
        let products = await response.json();
        responseProcessorFunction(products);
    }
    catch (err) {
        console.log(err);
    }
}

function parseProducts(responseJSON) {
    console.log(responseJSON.products[0].name);
}

fetchJSON('../json/products.json', parseProducts);

/* TOGGLE MENU */

let menuButton = document.getElementById('menuButton');
let menuBar = document.getElementById('menuBarID');
let menuVisible = true;

function toggleMenu()
{
    if(menuVisible)
    {
        menuBar.style.display = "none";
        menuVisible = !menuVisible;
    }
    else
    {
        menuBar.style.display = "block";
        menuVisible = !menuVisible;
    }
}

menuButton.addEventListener("click", e=> toggleMenu());
