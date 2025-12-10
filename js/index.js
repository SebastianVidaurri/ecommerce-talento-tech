//seleccionamos los contenedores donde vamos a renderizar
const productsContainer = document.querySelector('.sections-products');
const commentsContainer = document.querySelector('.sections-comments');

//llamamos a la api
fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => {
        // --- LOGICA DE PRODUCTOS ---
        
        //tomamos 4 productos con slice
        const products = data.products.slice(0, 4);

        //renderizamos los productos
        let productsHTML = '';
        for (let i = 0; i < products.length; i++) {
            const prod = products[i];

            productsHTML += `
            <article class="product">
                <h2>${prod.title}</h2>
                <img src="${prod.thumbnail}" alt="${prod.title}">
                <p>${prod.description.slice(0, 50)}...</p>
                <h3>$${prod.price}</h3>
                <div class="card-footer">
                    <a href="./detalle.html?id=${prod.id}" class="info">Más info</a>
                    <button class="compra btn-add" id="${prod.id}" style="border:none; font-size:1rem; cursor:pointer;">Agregar al carrito</button>
                </div>
            </article>
            `;
        }
        productsContainer.innerHTML = productsHTML;

        // --- LÓGICA PARA AGREGAR AL CARRITO ---
        const addButtons = document.querySelectorAll('.btn-add');
        
        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.id;
                // Buscamos el objeto producto completo
                const productSelected = products.find(prod => prod.id == productId);
                addToCart(productSelected);
            });
        });

        // --- LOGICA DE COMENTARIOS ---

        //recuperar desde la api algunos comentarios
        let reviews = [];
        for (let i = 0; i < products.length; i++) {
            const prod = products[i];

            if (prod.reviews) {
                reviews = reviews.concat(prod.reviews);
            }
        }

        //limitar los comentarios a 4
        reviews = reviews.slice(0, 4);

        //renderizar los comentarios
        let reviewsHTML = '';

        for (let i = 0; i < reviews.length; i++) {
            const review = reviews[i];

            reviewsHTML += `
            <div class="comment">
                <h4>${review.reviewerName}</h4> 
                <p>${review.comment}</p>
                <h5>Fecha: ${new Date(review.date).toLocaleDateString()}</h5>
            </div>
            `;
        }

        commentsContainer.innerHTML = reviewsHTML;

    }) 
    .catch((error) => console.log('Hubo un error: ' + error));

// Función auxiliar para guardar en LocalStorage
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
}