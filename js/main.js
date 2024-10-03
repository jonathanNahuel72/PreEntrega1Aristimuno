const PRODUCTS = [
    { name: 'Cartera cuero', price: 35000, img: './images/cartera_cuero.png' },
    { name: 'Cartera eco-cuero', price: 15000, img: './images/cartera_eco_cuero.png' },
    { name: 'Cartera gamuza', price: 20000, img: './images/cartera_gamuza.png' },
    { name: 'Riñonera', price: 14000, img: './images/rinonera.png' },
    { name: 'Billeteras', price: 8000, img: './images/billetera.png' },
    { name: 'Cintos', price: 3500, img: './images/cintos.png' }
];

let cart = [];
let total = 0;

window.onload = function () {
    const productosDisponiblesDiv = document.getElementById("productosDisponibles");

    PRODUCTS.forEach((product, index) => {
        const productTemplate = `
            <div class="producto">
                <img src="${product.img}" alt="${product.name}">
                <span>${product.name} - $${product.price}</span>
                <button onclick="addToCart(${index})">Agregar</button>
            </div>`;
        productosDisponiblesDiv.innerHTML += productTemplate;
    });
};

function addToCart(index) {
    const product = PRODUCTS[index];

    const isInCart = cart.some(item => item.name === product.name);
    if (isInCart) {
        alert('Este producto ya está en el carrito.');
        return;
    }

    if (cart.length >= 6) {
        alert('No puedes agregar más de 6 productos');
        return;
    }

    cart.push({ ...product, id: Date.now() });
    total += product.price;
    updateCart();
}

function updateCart() {
    const cartCard = document.getElementById('cartCard');
    cartCard.innerHTML = '';

    cart.forEach((product, index) => {
        const cartItemTemplate = `
            <li class="cart-item">
                <img src="${product.img}" alt="${product.name}">
                ${product.name} - $${product.price}
                <button class="remove-btn" onclick="removeFromCart(${index})">Quitar</button>
            </li>`;
        cartCard.innerHTML += cartItemTemplate;
    });

    document.getElementById("total").innerText = total;
    toggleCheckoutButton();
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

    let purchaseStatus;
    try {
        do {
            purchaseStatus = prompt('¿Quieres confirmar la compra? (si/no)').toLowerCase();
        } while (purchaseStatus !== 'si' && purchaseStatus !== 'no');
    } catch (error) {
        alert('Ocurrió un error durante la compra.');
        return;
    }

    if (purchaseStatus === 'si') {
        alert(`Compra realizada con éxito. Total: $${total}`);
        cart = [];
        total = 0;
        updateCart();
        continueShopping();
    } else {
        alert('Compra cancelada.');
    }
}

function continueShopping() {
    let continueShopping = confirm("¿Deseas seguir comprando?");
    if (continueShopping) {
        alert("Continúa explorando nuestros productos.");
    } else {
        alert("Gracias por tu compra. ¡Vuelve pronto!");
    }
}

function toggleCheckoutButton() {
    const btnCompra = document.getElementById('btnCompra');
    if (cart.length === 0) {
        btnCompra.classList.add('btn-disabled');
        btnCompra.disabled = true;
    } else {
        btnCompra.classList.remove('btn-disabled');
        btnCompra.disabled = false;
    }
}