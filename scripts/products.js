/* PRODUCTS - LOAD, RENDERING, CART */

let cart;

function loadCartFromStorage() {
    cart = JSON.parse(window.localStorage.getItem('cart'));
}

function cartHasProduct(productID) {
    return !! cart && !! cart["" + productID];
}

// FIXME
function addToCart(productID) {
    if (cartHasProduct(productID)) return;
    cart["" + productID] = { //FUNGERAR INTE! Nullreferens, inget nytt objektattribut skapas?
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

function setAddToCartButtonInnerText(addToCartBtn, productID) {
    if (cartHasProduct(productID)) {
        addToCartBtn.innerHTML = "Tillagd";
        addToCartBtn.classList.add('added');
    }
    else {
        addToCartBtn.innerHTML = "Lägg till";
        addToCartBtn.classList.remove('added');
    }
}

function renderAddToCartButton(productID) {
    let addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');
    // addToCart kontrollerar om varan redan är tillagd, därför behöver eventlyssnaren inte tas bort efter köp.
    addToCartBtn.addEventListener('click', e => addToCart(productID));
    setAddToCartButtonInnerText(addToCartBtn, productID);
    window.addEventListener('storage', e => setAddToCartButtonInnerText(addToCartBtn, productID));
    return addToCartBtn;
}

function renderProductsPage(productsJSON) {
    let grid = document.getElementById('product-grid');
    if (!grid) return;
    
    productsJSON.products.forEach(prod => {
        let productDiv = document.createElement('div');
        let readMoreBtn = document.createElement('button');
        productDiv.classList.add('product');
        readMoreBtn.classList.add('read-more-btn');
        productDiv.insertAdjacentHTML('afterbegin',
        `<img src="${prod.imageURL}" width="256" height="144" >` +
        `<h2>${prod.name}<span>${prod.price} kr</span></h2>` +
        `<p>${prod.summary}<p>`);
        //TODO:
        // - Lägg till "Läs mer"-knapp och popupfönster kopplad till denna.
        productDiv.appendChild(renderAddToCartButton(prod.id));
        grid.appendChild(productDiv);
    });
}

fetchJSON('../json/products.json', renderProductsPage);
