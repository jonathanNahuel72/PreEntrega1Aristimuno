
const PRODUCTS = [
    { name: 'Cartera cuero', price: 35000 },
    { name: 'Cartera eco-cuero', price: 15000 },
    { name: 'Cartera gamuza', price: 20000 },
    { name: 'Riñonera', price: 14000 },
    { name: 'Billeteras', price: 8000 }
];

let cart = [];
let total = 0;

window.onload = function () {
    const productosDisponiblesDiv = document.getElementById("productosDisponibles");

    PRODUCTS.forEach((product, index) => {
        const productTemplate = `
            <div>
                <span>${product.name} - $${product.price}</span>
                <button onclick="addToCart(${index})">Agregar</button>
            </div>`;
        productosDisponiblesDiv.innerHTML += productTemplate;
    });
};


function addToCart(index) {
    if (cart.length >= 6) {
        alert('No puedes agregar más de 6 productos');
        return;
    }

    const product = PRODUCTS[index];
    cart.push({ ...product, id: Date.now() });
    total += product.price;
    updateCart();
}


function updateCart() {
    const cartList = document.getElementById('cartCard');
    cartCard.innerHTML = '';

    cart.forEach((product, index) => {
        const cartItemTemplate = `
            <li>
                ${product.name} - $${product.price}
                <button class="remove-btn" onclick="removeFromCart(${index})">Quitar</button>
            </li>`;
            cartCard.innerHTML += cartItemTemplate;
    });

    document.getElementById("total").innerText = total;
}


function removeFromCart(index) {
    const product = cart[index];
    total -= product.price;
    cart.splice(index, 1);
    updateCart();
}


function checkout() {
    if (cart.length === 0) {
        alert("Ops' el carrito está vacío!");
        return;
    }

    let purchaseStatus = prompt('¿Quieres confirmar la compra? (si/no)');

    switch (purchaseStatus.toLowerCase()) {
        case 'si':
            alert(`Compra con éxito. Total: $${total}`);
            break;
        case 'no':
            alert('Compra cancelada.');
            break;
        default:
            alert('Respuesta no válida. Compra cancelada.');
            break;
    }

    cart = [];
    total = 0;
    updateCart();
}