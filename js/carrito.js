const cartBox = document.querySelector('#cart-box');

// 1. Recuperamos la lista de productos guardados en el navegador
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 2. Verificamos si hay productos en el carrito
if (cart.length > 0) {
    let cartHTML = '';
    let total = 0;

    // Recorremos cada producto para dibujarlo
    cart.forEach((product, index) => {
        total += product.price; // Sumamos el precio al total

        cartHTML += `
        <div class="cart-item">
            <img src="${product.thumbnail}" alt="${product.title}">
            <div class="item-details">
                <h3>${product.title}</h3>
                <p>Categoría: ${product.category || 'Varios'}</p>
                <p>${product.description.slice(0, 50)}...</p>
                <button class="btn-remove" onclick="removeFromCart(${index})" style="color: red; background: none; border: none; cursor: pointer; margin-top: 5px;">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
            </div>
            <div class="item-price">$${product.price}</div>
        </div>
        `;
    });

    // Agregamos el resumen final con el total
    cartHTML += `
        <div class="cart-summary">
            <p>Total a pagar (${cart.length} productos):</p>
            <h3>$${total.toFixed(2)}</h3>
            
            <button class="btn-checkout" onclick="alert('¡Compra finalizada!')">Finalizar Compra</button>
            <br><br>
            <button onclick="clearCart()" style="background:#e74c3c; color:white; border:none; padding:8px; border-radius:4px; cursor:pointer;">Vaciar Carrito</button>
        </div>
    `;

    cartBox.innerHTML = cartHTML;

} else {
    // Si el carrito está vacío, mostramos el mensaje
    cartBox.innerHTML = `
        <div class="empty-msg">
            <i class="fa-solid fa-cart-arrow-down"></i>
            <h3>Tu carrito está vacío</h3>
            <p>Selecciona productos desde el inicio.</p>
            <a href="index.html" class="btn-checkout" style="text-decoration:none; display:inline-block; margin-top:10px;">Ir a comprar</a>
        </div>
    `;
}

// --- FUNCIONES PARA ELIMINAR ---

// Eliminar un solo producto por su posición (índice)
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1); // Quita el elemento
    localStorage.setItem('cart', JSON.stringify(cart)); // Guarda el cambio
    location.reload(); // Recarga la página
}

// Vaciar todo el carrito
function clearCart() {
    localStorage.removeItem('cart');
    location.reload();
}