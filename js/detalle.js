//obtener la queryString
const queryString = location.search;
const stringObj = new URLSearchParams(queryString);
const Id = stringObj.get('id');

//seleccionar los elementos del DOM donde vamos a insertar los datos que vienen desde la API
const title = document.querySelector("#prod-title");
const img = document.querySelector("#prod-img");
const desc = document.querySelector("#prod-description");
const price = document.querySelector("#prod-price");
const buyBtn = document.querySelector("#prod-btn");
const prodSize = document.querySelector("#prod-size");
const prodLongDesc = document.querySelector("#prod-longdesc");
const reviewsBox = document.querySelector("#reviews");

// Variable para guardar el producto que trajimos de la API
let currentProduct = null;

//llamar a la API para obtener los datos del producto
if (Id) {
    fetch(`https://dummyjson.com/products/${Id}`)
        .then((res) => res.json()) 
        .then((data) => {
            // Guardamos los datos en nuestra variable global
            currentProduct = data;

            //mostrar la info del producto
            title.textContent = data.title;
            img.src = data.thumbnail;
            img.alt = data.title;
            desc.textContent = data.description;
            price.textContent = `$${data.price}`;
            
            // MODIFICACIÓN: Cambiamos el comportamiento del botón
            // Quitamos el enlace directo y lo hacemos botón de acción
            buyBtn.removeAttribute('href');
            buyBtn.style.cursor = 'pointer';
            buyBtn.innerText = "Agregar al Carrito"; // Opcional: cambiamos el texto

            buyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentProduct) {
                    addToCart(currentProduct);
                }
            });
            
            //dimensiones
            if (data.dimensions) {
                prodSize.textContent = ` ${data.dimensions.width} x ${data.dimensions.height} x ${data.dimensions.depth} cm`;
            }
            
            //descripcion larga
            prodLongDesc.textContent = data.description; 
            
            //comentarios
            let reviewsHTML = '';
            if (data.reviews) {
                data.reviews.forEach((review) => {
                    reviewsHTML += `
                    <div class="comment">
                        <h4>${review.reviewerName}</h4> 
                        <p>${review.comment}</p>
                        <h5>${new Date(review.date).toLocaleDateString()}</h5>
                    </div>
                    `;
                });
            }
            reviewsBox.innerHTML = reviewsHTML; 

        })
        .catch((error) => {
            console.error('Error fetching product details:', error);
        });
}

// Función para agregar al carrito (LocalStorage)
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Preguntamos si quiere ir al carrito ahora
    if(confirm(`¡${product.title} agregado! ¿Quieres ir al carrito?`)){
        window.location.href = 'carrito.html';
    }
}