// Obtén el ID del producto de la URL (podemos usar la url porque no estamos haciendo http en internet sino en el equipo)
const urlParams = new URL(window.location.href);
const productId = urlParams.searchParams.get("id");
// Función para obtener los detalles del product
// Intenta recuperar el producto desde localStorage
const productJSON = localStorage.getItem(`product_${productId}`);

// Creamos el evento de escucha del click del botón agregar al carrito
document.addEventListener("DOMContentLoaded", () => {
  const product = JSON.parse(productJSON);

  // Agrega un evento al botón "Agregar al Carrito"
  const agregarAlCarritoButton = document.getElementById("agregarAlCarrito");

  agregarAlCarritoButton.addEventListener("click", () => {
    // Agrega el producto al carrito en localStorage
    agregarAlCarrito(product);
  });
});

// creamos la función de agregar al carrito de compra
function agregarAlCarrito(product) {
  // Obtén el carrito actual desde localStorage o crea un array vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Agrega el producto al carrito
  carrito.push(product);

  // Guarda el carrito actualizado en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Puedes mostrar una confirmación de que el producto se ha agregado al carrito
  alert("Producto agregado al carrito");
}

// mostramos el detalle del producto:
if (productJSON) {
  // Si el producto está en localStorage, convierte el JSON a un objeto JavaScript
  const product = JSON.parse(productJSON);

  // Muestra los detalles del producto en la página
  const detallesContainer = document.querySelector(".detalles-producto");
  detallesContainer.innerHTML = `
        <div class="content">
          <div class="details">
            <div class="details-image">
              <img src="${product.image}"
            </div>
            <div class="details-info">
              <ul>
                <li>
                  <h1>${product.title}</h1>
                </li>
                <li>
                  Precio: <strong>$${product.price}</strong>
                </li>
                <li>
                  Descripción: 
                  <div>
                    ${product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div class="details-action">
              <ul>
                <li>
                  Price: $${product.price}
                </li>
                <li>
                  Estado: 
                  ${
                    product.count > 0 
                    ? `<span class="sucess">Disponible</span>`
                    : '<span class="error">Agotado</span>'
                  }
                </li>
                <li>
                  <button id="add-button" class="Prymary">Add to Cart</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
   `;
} else {
  // Si el producto no está en localStorage, muestra un mensaje de que no se ha encontrado.
  console.log("Producto no encontrado en el almacenamiento local.");
}
