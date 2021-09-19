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

let cart;

function loadCartFromStorage() {
    cart = JSON.parse(window.localStorage.getItem('cart'));
}

function cartHasProduct(id) {
    return !! cart && !! cart["" + id];
}

//Testa om detta funkar!
function addToCart(product) {
    if (cartHasProduct(product.id)) return;
    cart["" + product.id] = { 
        "timestamp" : new Date().toJSON(), 
        "number-of-items" : 1
    };
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

document.addEventListener('DOMContentLoaded', e => loadCartFromStorage());
window.addEventListener('storage', e => loadCartFromStorage());

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

function renderProductsPage(productsJSON) {
    let grid = document.getElementById('product-grid');
    if (!grid) return;
    
    productsJSON.products.forEach(prod => {
        let productDiv = document.createElement('div');
        let addToCartBtn = document.createElement('button');
        let readMoreBtn = document.createElement('button');
        productDiv.classList.add('product');
        addToCartBtn.classList.add('add-to-cart-btn');
        readMoreBtn.classList.add('read-more-btn');
        productDiv.insertAdjacentHTML('afterbegin',
        `<img src="${prod.imageURL}" width="256" height="144" >` +
        `<h2>${prod.name}<span>${prod.price} kr</span></h2>` +
        `<p>${prod.summary}<p>`);
        //TODO:
        // - Lägg till "Läs mer"-knapp och popupfönster kopplad till denna.
        // - Lägg till "Köp"-knapp som är inaktiverad om produkten redan är köpt.
    });
}

fetchJSON('../json/products.json', renderProductsPage);

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
