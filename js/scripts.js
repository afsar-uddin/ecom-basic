// get element id
const getElementId = id => {
    return document.getElementById(id)
}

// get innerText
const getInnerText = id => {
    const elm = document.getElementById(id).innerText;
    const elmValue = parseFloat(elm);
    return elmValue
}

// fetch products item
const fetchProduct = async () => {
    try {
        const url = 'https://fakestoreapi.com/products';
        const res = await fetch(url);
        const data = await res.json();
        showProduct(data)
    } catch (err) {
        console.log(err)
    }
}
// show products
fetchProduct();
const showProduct = products => {
    const allProducts = getElementId('all-products');
    products.forEach(product => {
        const div = document.createElement('div');
        const clss = ['card', 'col-lg-3', 'col-md-6'];
        clss.forEach(function (item) { div.classList.add(item) }); //multiple class add
        // div.classList.mclass;
        div.innerHTML = `
            <img src="${product.image}" class="card-img-top" style ="width:10rem; height: 10rem" alt="product image">
            <div class="card-body">
            <h5 class="card-title">${product.title.slice(0, 18)}</h5>
            <p>Price: $${product.price}</p>
            <p>User Rating: ${product.rating.rate} &#9733;</p>
            <p class="card-text">${product.description.slice(0, 100)}</p>
                <footer class="d-flex justify-content-between bottom-0 end-0">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}, ${product.price})">Add to cart</button>
                    <button class="btn btn-primary" id="product-id" data-bs-toggle="modal"" onclick="fetchDetail(${product.id})">View Detail</button>
                </footer>
            </div>
    `;
        allProducts.appendChild(div);
    })
};

// fetch product detail
const fetchDetail = async id => {
    try {
        const url = `https://fakestoreapi.com/products/${id}`
        const res = await fetch(url);
        const data = await res.json();
        showDetail(data);
    } catch (err) {
        console.log(err)
    }
}

// modal show for detail product
var modalWrap = null;
const showDetail = product => {
    if (modalWrap !== null) {
        modalWrap.remove();
    }
    modalWrap = document.createElement('div');
    modalWrap.innerHTML = `
        
        <div class="modal fade">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title">${product.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${product.image}" class="card-img-top" style ="width:10rem; height: 10rem" alt="product image">
            <p>Price: $ ${product.price}</p>
            <p>User Rating: ${product.rating.rate} &#9733;</p>
            <p>${product.description}</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>   
    `;
    var modal = new bootstrap.Modal(modalWrap.querySelector('.modal')); // provide by bootstrap
    modal.show();
    return document.body.append(modalWrap);
};

// add to cart
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    document.getElementById('items').innerText = count;
    document.getElementById('total-Products').innerText = count;
    // total price
    totalPrice("price", price);
    // tax amount 
    getTax();
    // grand total 
    grandTotal();
}
// product total price
const totalPrice = (id, price) => {
    const oldPrice = getInnerText("price");
    const productPrice = parseFloat(price);
    const totalPrice = oldPrice + productPrice;
    document.getElementById("price").innerText = totalPrice.toFixed(2);

    // delivery charge 
    if (totalPrice > 300) {

        document.getElementById('delivery-charge').innerText = 30;
    } if (totalPrice > 600) {
        document.getElementById('delivery-charge').innerText = 45;
    } if (totalPrice > 800) {
        document.getElementById('delivery-charge').innerText = 60;
    }
}

// get tax 
const getTax = () => {
    const priceAmount = getInnerText("price");
    if (priceAmount > 200) {
        const tax = parseFloat(priceAmount * 0.1).toFixed(2);
        document.getElementById("total-tax").innerText = tax;
    } if (priceAmount > 400) {
        const tax = parseFloat(priceAmount * 0.2).toFixed(2);
        document.getElementById("total-tax").innerText = tax;
        console.log(tax)
    } if (priceAmount > 800) {
        const tax = parseFloat(priceAmount * 0.3).toFixed(2);
        document.getElementById("total-tax").innerText = tax;
    }
}

// grand total price
const grandTotal = () => {
    const grandTotal = getInnerText("price") + getInnerText("delivery-charge") + getInnerText("total-tax");
    document.getElementById('total').innerText = grandTotal.toFixed(2);

}
grandTotal();