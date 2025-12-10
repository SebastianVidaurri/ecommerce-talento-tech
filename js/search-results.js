// Obtener la query string de la URL
const queryString = location.search;
const params = new URLSearchParams(queryString);
const query = params.get('q'); // Obtiene el valor de ?q=...

// Seleccionar elementos del DOM
const searchTitle = document.querySelector('#search-title');
const resultsContainer = document.querySelector('#search-results-container');

// Validar si existe el término de búsqueda
if (query) {
    // Actualizar título
    searchTitle.textContent = `Resultados de búsqueda para: "${query}"`;

    // Llamar al endpoint de búsqueda de la API
    fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
            const products = data.products;

            // Verificar si hay resultados
            if (products.length === 0) {
                resultsContainer.innerHTML = `<h3>No se encontraron productos que coincidan con "${query}"</h3>`;
            } else {
                let contentHTML = '';

                // Generar HTML de los productos encontrados
                products.forEach(prod => {
                    contentHTML += `
                    <article class="product">
                        <h2>${prod.title}</h2>
                        <img src="${prod.thumbnail}" alt="${prod.title}">
                        <p>${prod.description.slice(0, 50)}...</p>
                        <h3>$${prod.price}</h3>
                        <div class="card-footer">
                            <a href="./detalle.html?id=${prod.id}" class="info">Más info</a>
                            <button class="compra btn-add" id="${prod.id}">Agregar al carrito</button>
                        </div>
                    </article>
                    `;
                });

                resultsContainer.innerHTML = contentHTML;

                // Asignar eventos a los botones de agregar al carrito
                const addButtons = document.querySelectorAll('.btn-add');
                addButtons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        const productId = e.target.id;
                        const productSelected = products.find(prod => prod.id == productId);
                        addToCart(productSelected);
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error al buscar:', error);
            resultsContainer.innerHTML = '<h3>Hubo un error al realizar la búsqueda.</h3>';
        });

} else {
    // Si no hay query en la URL
    searchTitle.textContent = 'Búsqueda vacía';
    resultsContainer.innerHTML = '<h3>Por favor ingresa un término para buscar.</h3>';
}

// Función para guardar en LocalStorage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`¡${product.title} agregado al carrito!`);
}