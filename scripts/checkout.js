let productPanel = document.getElementById("productPanel");
let productMap = JSON.parse( window.localStorage.getItem('cart'));
let sumOfProducts = 0;
function renderCart()
{
    productPanel.insertAdjacentHTML("beforebegin", `<div class="form-group"><hr /></div>`);
    for( let productKey in productMap) {
       let product = productMap[productKey];
        productPanel.insertAdjacentHTML("beforebegin", `
            <div class="form-group">
             <div class="col-sm-3 col-xs-3">
                 <img class="img-responsive" src=${product.url}/>
             </div>
             <div class="col-sm-6 col-xs-6">
                <div class="col-xs-12">${product.name}</div>
             </div>
            <div class="col-sm-3 col-xs-3 text-right">
             <h6><span>$</span>${product.price}</h6>
            </div>
            </div>
            <div class="form-group"><hr /></div>`);
    console.log(product);
    sumOfProducts += product.price;
    }

    productPanel.insertAdjacentHTML("afterend", `<div class="form-group">
                                    <div class="col-xs-12">
                                        <strong id=" id="orderTotalText">Order Total</strong>
                                        <div class="pull-right" id="orderTotal"><span>$</span><span>${sumOfProducts}</span></div>
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
    window.localStorage.removeItem("cart");
});
