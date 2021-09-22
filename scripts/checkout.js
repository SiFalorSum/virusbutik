let productPanel = document.getElementById("productPanel");
let productMap = JSON.parse( window.localStorage.getItem('cart'));
let sumOfProducts = 0;
function renderCart()
{
    if(!productMap) return;
    for( let productKey in productMap) {
       let product = productMap[productKey];
        productPanel.insertAdjacentHTML("beforebegin", `<div className="form-group">
    <div className="col-sm-3 col-xs-3">
    <img class="cartProdImg" className="img-responsive" src=${product.url}/>
    </div>
    <div className="col-sm-6 col-xs-6">
    <div className="col-xs-12">${product.name}</div>
    </div>
    <div className="col-sm-3 col-xs-3 text-right">
    <h6><span>$</span>${product.price}</h6>
    </div>
    </div>`);
    console.log(product);
    sumOfProducts += product.price;
    }
    productPanel.insertAdjacentHTML("afterend", `<div class="form-group">
                                    <div class="col-xs-12">
                                        <strong>Order Total</strong>
                                        <div class="pull-right"><span>$</span><span>${sumOfProducts}</span></div>
                                    </div>
                                </div>
                                <div id="btnDiv">
                                <div id="PlaceOrderBtn" class="form-group">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <button type="submit" class="btn btn-primary btn-submit-fix" id="placeOrderBtn">Place Order</button>
                                    </div>
                                </div>
                                </div>`);
}
renderCart();
let orderButton = document.getElementById("placeOrderBtn");
orderButton.addEventListener("click", function(){
    window.alert("Thanks for your order!");
});
