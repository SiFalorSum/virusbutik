/* PRODUCTS - LOAD, RENDERING, CART */

let cart;

let productsString = `{
    "products" : [
        {
            "id" : "1",
            "name" : "Heartbleed",
            "summary" : "Exploit the bleeding heart of modern TLS protocols.",
            "description" : "Löksås ipsum smultron sjö icke både kunde tiden jäst strand åker, faktor tid på dimmhöljd sin sjö äng tre. Från redan räv i brunsås bäckasiner är stig mjuka bra söka, dimmhöljd träutensilierna bland har från söka plats både nu sista det, dag som stig denna inom söka färdväg se bra. Har tidigare groda dunge enligt färdväg hwila kan häst nu rot redan sorgliga, dag björnbär trevnadens sig verkligen helt på jäst vidsträckt varit.",
            "price" : 295,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "2",
            "name" : "Cryptolocker",
            "summary" : "Lock people's computers until you get payed.",
            "description" : "Vidsträckt bäckasiner kom lax brunsås samma göras hav bäckasiner, tre olika ska både helt annat tidigare söka, jäst verkligen kanske sista vad både och. Bra stora dag nya sig annan räv ingalunda, vidsträckt tidigare i sjö sitt icke omfångsrik, och flera hav bäckasiner har år. Samma del häst varit dimmhöljd plats hela att för, gamla bäckasiner det varit ska verkligen år, genom tid se sjö som upprätthållande faktor.",
            "price" : 395,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "3",
            "name" : "ILOVEYOU",
            "summary" : "Unleash chaos and fill everybody's mail boxes!",
            "description" : "Dimma jäst gör rännil tre som händer vad bland, som nya samtidigt är och blivit tid, dag brunsås se därmed tidigare mot blivit. Jäst när se både har ser händer när, bäckasiner kunde sitt och göras sjö. Det dock annat dimma hans nya göras händer där det enligt flera, inom när vidsträckt annat är räv plats kunde annat.",
            "price" : 199,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "4",
            "name" : "Stuxnet",
            "summary" : "Do you want to control some nuclear weapons?",
            "description" : "Placeholder",
            "price" : 19999,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "5",
            "name" : "Green Caterpillar",
            "summary" : "Troll somebody with this nice looking caterpillar.",
            "description" : "Placeholder",
            "price" : 99,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "6",
            "name" : "Dirt Finder",
            "summary" : "The perfect trojan for people who wants to dig up some dirt on their enemies.",
            "description" : "Placeholder",
            "price" : 399,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "7",
            "name" : "25.8",
            "summary" : "The root of all evil will grant you full control of someone's computer.",
            "description" : "Placeholder",
            "price" : 999,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        },
        {
            "id" : "8",
            "name" : "Sony BMG",
            "summary" : "Who would have thought that the music CD had more than music.",
            "description" : "Placeholder",
            "price" : 199,
            "imageURL" : "../images/cookie-the-pom-gySMaocSdqs-unsplash.jpg"
        }
    ]
}`;

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


function setAddToCartButtonInnerText(addToCartBtn, productID) {
    if (cartHasProduct(productID)) {
        addToCartBtn.innerHTML = "Added";
        addToCartBtn.classList.add('added');
    } else {
        addToCartBtn.innerHTML = "Add to cart";
        addToCartBtn.classList.remove('added');
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
        console.log("asd");
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
        <p class="price">$${prod.price}</p>
        <p>${prod.summary}</p>
        `);

        //TODO:
        // - Lägg till "Läs mer"-knapp och popupfönster kopplad till denna.
        productDiv.appendChild(renderAddToCartButton(prod));
        grid.appendChild(productDiv);
    });

    setAddToCartButtonText();
}

renderProductsPage(JSON.parse(productsString));
