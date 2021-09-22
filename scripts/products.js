/* PRODUCTS - LOAD, RENDERING, CART */

let cart;
function loadCartFromStorage() {
    cart = JSON.parse(window.localStorage.getItem('cart'));
    if (!cart) cart = {};
}

function cartHasProduct(productID) {
    return !! cart && !! cart["" + productID];
}

function addToCart(product) {
    if (cartHasProduct(product.id)) {
        delete cart["" + product.id];
    }
    else {
        cart["" + product.id] = {
            "timestamp" : new Date().toJSON(),
            "number-of-items" : 1,
            "name" : product.name,
            "price": product.price,
            "url": product.imageURL
        };
    }
    console.log(cart);
    window.localStorage.setItem('cart', JSON.stringify(cart));
    setAddToCartButtonText();
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

function setAddToCartButtonText() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        if (cartHasProduct(button.dataset.productid)) {
            button.innerHTML = "Ångra";
            button.classList.add('added');
        }
        else {
            button.innerHTML = "Lägg till";
            button.classList.remove('added');
        }
    });
}

function renderAddToCartButton(product) {
    let addToCartBtn = document.createElement('button');
    addToCartBtn.classList.add('add-to-cart-btn');
    addToCartBtn.setAttribute('data-productid', product.id);
    addToCartBtn.addEventListener('click', e => {
        addToCart(product);
        setAddToCartButtonText();
        console.log(`Button for product ${product.id} was clicked.`);
    });
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
        productDiv.appendChild(renderAddToCartButton(prod));
        grid.appendChild(productDiv);
    });

    setAddToCartButtonText();
}

document.addEventListener('DOMContentLoaded', e => loadCartFromStorage());
window.addEventListener('storage', e => {
    setAddToCartButtonText();
    loadCartFromStorage();
});

fetchJSON('../json/products.json', renderProductsPage);
