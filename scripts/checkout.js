let productPanel = document.getElementById("productPanel");
let productMap = JSON.parse( window.localStorage.getItem('cart'));
function renderCart()
{
    if(!productMap) return;
    for( let productKey in productMap) {
       let product = productMap[productKey];
        productPanel.insertAdjacentHTML("beforebegin", `<div className="form-group">
    <div className="col-sm-3 col-xs-3">
    <img className="img-responsive" src=${product.url}/>
    </div>
    <div className="col-sm-6 col-xs-6">
    <div className="col-xs-12">${product.name}</div>
    <div className="col-xs-12"><small>Quantity:<span>1</span></small></div>
    </div>
    <div className="col-sm-3 col-xs-3 text-right">
    <h6><span>$</span>${product.price}</h6>
    </div>
    </div>`);
    console.log(product);
    }
}
renderCart();