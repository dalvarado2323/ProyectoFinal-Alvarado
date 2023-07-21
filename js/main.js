// Elementos del DOM
const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const correoInput = document.getElementById('correo');
const btnConectar = document.getElementById('btnConectar');
const saludoContainer = document.getElementById('saludo');
const btnComprar = document.getElementById('btnComprar');
const btnCancelar = document.getElementById('btnCancelar');
const cartContainer = document.getElementById('cartContainer');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cartItemsList = [];
let cartCount = 0;
let cartTotalAmount = 0;

// Función para mostrar un saludo cordial
const mostrarSaludo = () => {
    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const correo = correoInput.value;

    if (nombre && apellido && correo) {
        saludoContainer.textContent = `¡Hola ${nombre} ${apellido}! Gracias por conectarte.`;
    }
};

// Evento click en el botón "Conectar"
btnConectar.addEventListener('click', mostrarSaludo);

// Cargar servicios desde el archivo JSON
fetch('/data/servicios.json')
    .then((response) => response.json())
    .then((data) => {
        const servicesContainer = document.querySelector('.services');

        data.forEach((service) => {
            const serviceHTML = `
                <div class="service">
                    <div class="service-info">
                        <span class="service-icon">${service.icon}</span>
                        <h2 class="service-title">${service.name}</h2>
                        <p class="service-price">$${service.price}</p>
                    </div>
                    <div class="service-actions">
                        <button class="add-to-cart" data-id="${service.id}" data-name="${service.name}" data-price="${service.price}">Agregar al Carrito</button>
                    </div>
                </div>
            `;
            servicesContainer.insertAdjacentHTML('beforeend', serviceHTML);
        });

        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach((button) => {
            button.addEventListener('click', addToCart);
        });
    })
    .catch((error) => {
        console.error('Error al cargar los datos:', error);
    });

// Función para agregar un servicio al carrito
const addToCart = (event) => {
    const serviceId = event.target.dataset.id;
    const serviceName = event.target.dataset.name;
    const servicePrice = parseFloat(event.target.dataset.price);

    const cartItem = {
        id: serviceId,
        name: serviceName,
        price: servicePrice,
    };

    cartItemsList.push(cartItem);
    cartCount++;
    cartTotalAmount += servicePrice;

    // Mostrar el mensaje de "Has agregado una meditación!" utilizando Toastify
    Toastify({
        text: "Has agregado una meditación!",
        duration: 3000, // Duración en milisegundos (3 segundos en este caso)
        backgroundColor: "#510c76",
        color: "white",
    }).showToast();

    updateCart();
    saveCartToLocalStorage(); // Guardar el carrito en localStorage
};

// Función para actualizar el carrito
const updateCart = () => {
    cartItems.innerHTML = '';
    cartItemsList.forEach((item) => {
        const cartItemHTML = `<li>${item.name} - $${item.price}</li>`;
        cartItems.insertAdjacentHTML('beforeend', cartItemHTML);
    });

    cartTotal.textContent = `Total: $${cartTotalAmount.toFixed(2)}`;
    updateFloatingCart();
};

// Función para mostrar u ocultar el carrito flotante
const updateFloatingCart = () => {
    if (cartCount > 0) {
        cartContainer.style.display = 'block';
    } else {
        cartContainer.style.display = 'none';
    }
};

// Evento click en el botón "Comprar"
btnComprar.addEventListener('click', () => {
    // Mostrar el mensaje de "¡Gracias por tu compra! Disfruta de tus productos." utilizando Toastify
    Toastify({
        text: "¡Gracias por tu compra! Disfruta de tus productos.",
        duration: 3000, // Duración en milisegundos (3 segundos en este caso)
        backgroundColor: "#510c76",
        color: "white",
    }).showToast();

    clearCart();
    saveCartToLocalStorage(); // Guardar el carrito vacío en localStorage después de la compra
});

// Evento click en el botón "Cancelar"
btnCancelar.addEventListener('click', () => {
    clearCart();
    cartContainer.style.display = 'none';
    saveCartToLocalStorage(); // Guardar el carrito vacío en localStorage después de cancelar
});

// Función para limpiar el carrito
const clearCart = () => {
    cartItemsList = [];
    cartCount = 0;
    cartTotalAmount = 0;
    updateCart();
};

// Función para guardar el carrito en localStorage
const saveCartToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItemsList));
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('cartTotalAmount', cartTotalAmount);
};

// Cargar datos del carrito desde localStorage al cargar la página
window.addEventListener('load', function() {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedCartCount = localStorage.getItem('cartCount');
    const storedCartTotalAmount = localStorage.getItem('cartTotalAmount');

    if (storedCartItems && storedCartCount && storedCartTotalAmount) {
        cartItemsList = JSON.parse(storedCartItems);
        cartCount = parseInt(storedCartCount);
        cartTotalAmount = parseFloat(storedCartTotalAmount);
        updateCart();
        updateFloatingCart();
    }
});
