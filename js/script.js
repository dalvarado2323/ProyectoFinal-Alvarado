document.getElementById('btnConectar').addEventListener('click', function() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const saludo = document.getElementById('saludo');
    saludo.textContent = `¡Hola, ${nombre} ${apellido}! Bienvenido(a) al e-commerce.`;

    // Almacenar nombre y apellido en localStorage
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('apellido', apellido);
});

// Cargar datos del carrito desde localStorage al cargar la página
window.addEventListener('load', function() {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedCartCount = localStorage.getItem('cartCount');
    const storedCartTotalAmount = localStorage.getItem('cartTotalAmount');

    if (storedCartItems && storedCartCount && storedCartTotalAmount) {
        cartItems.innerHTML = storedCartItems;
        cartCount = parseInt(storedCartCount);
        cartTotalAmount = parseFloat(storedCartTotalAmount);
        cartTotal.textContent = `Total: $${cartTotalAmount.toFixed(2)}`;
        updateFloatingCart();
    }
});
