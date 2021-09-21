/* PRODUCTS - LOAD, RENDERING, CART */

let cart;

let productsString = `{
    "products" : [
        {
            "id" : "1",
            "name" : "Hepatit C",
            "summary" : "Löksås ipsum smultron sjö",
            "description" : "Löksås ipsum smultron sjö icke både kunde tiden jäst strand åker, faktor tid på dimmhöljd sin sjö äng tre. Från redan räv i brunsås bäckasiner är stig mjuka bra söka, dimmhöljd träutensilierna bland har från söka plats både nu sista det, dag som stig denna inom söka färdväg se bra. Har tidigare groda dunge enligt färdväg hwila kan häst nu rot redan sorgliga, dag björnbär trevnadens sig verkligen helt på jäst vidsträckt varit.",
            "price" : 295,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "2",
            "name" : "Hårddiskherpes",
            "summary" : "Vidsträckt bäckasiner kom lax brunsås",
            "description" : "Vidsträckt bäckasiner kom lax brunsås samma göras hav bäckasiner, tre olika ska både helt annat tidigare söka, jäst verkligen kanske sista vad både och. Bra stora dag nya sig annan räv ingalunda, vidsträckt tidigare i sjö sitt icke omfångsrik, och flera hav bäckasiner har år. Samma del häst varit dimmhöljd plats hela att för, gamla bäckasiner det varit ska verkligen år, genom tid se sjö som upprätthållande faktor.",
            "price" : 395,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "3",
            "name" : "Webbklamydia",
            "summary" : "Det dock annat dimma hans nya göras",
            "description" : "Dimma jäst gör rännil tre som händer vad bland, som nya samtidigt är och blivit tid, dag brunsås se därmed tidigare mot blivit. Jäst när se både har ser händer när, bäckasiner kunde sitt och göras sjö. Det dock annat dimma hans nya göras händer där det enligt flera, inom när vidsträckt annat är räv plats kunde annat.",
            "price" : 199,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        }
    ]
}`;

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

function setAddToCartButtonInnerText(addToCartBtn, productID) {
    if (cartHasProduct(productID)) {
        addToCartBtn.innerHTML = "Added";
        addToCartBtn.classList.add('added');
    }
    else {
        addToCartBtn.innerHTML = "Add to cart";
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
        let productDiv = document.createElement('li');
        let readMoreBtn = document.createElement('button');

        productDiv.classList.add('product');
        readMoreBtn.classList.add('read-more-btn');

        productDiv.insertAdjacentHTML('afterbegin',
        `
        <img src="${prod.imageURL}" alt="Oopsy woopsy, we did a fucky wucky">
        <h2>${prod.name}</h2>
        <p class="price">${prod.price} kr</p>
        <p>${prod.summary}</p>
        `);

        //TODO:
        // - Lägg till "Läs mer"-knapp och popupfönster kopplad till denna.
        productDiv.appendChild(renderAddToCartButton(prod.id));
        grid.appendChild(productDiv);
    });
}

renderProductsPage(JSON.parse(productsString));