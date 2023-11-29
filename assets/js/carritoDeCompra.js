document.addEventListener("DOMContentLoaded", () => {
    // Obtén el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    // Obtén el elemento de la lista del carrito
    const carritoLista = document.getElementById("carritoLista");

    if (carrito && carrito.length > 0) {
      // Recorre los productos en el carrito y muestra cada uno en la lista
        carrito.forEach((product) => {
            const listItem = document.createElement("li");
            
            // Contenedor para la imagen
            const imageContainer = document.createElement("div");
            const productImage = document.createElement("img");
            productImage.src = product.image;
            productImage.alt = product.title;
            productImage.style.width = "100px";
            imageContainer.appendChild(productImage);

            // Contenedor para el nombre y el precio
            // Contenedor para el texto (nombre y precio) como lista
            const textContainer = document.createElement("ul");
            textContainer.classList.add("textContainer");

            const productNameItem = document.createElement("li");
            const productName = document.createElement("span");
            productName.textContent = product.title;
            productNameItem.appendChild(productName);

            const productPriceItem = document.createElement("li");
            const productPrice = document.createElement("span");
            productPrice.textContent = product.price;
            productPriceItem.appendChild(productPrice);

            textContainer.appendChild(productNameItem);
            textContainer.appendChild(productPriceItem);

            // Contenedor para los botones de incremento y decremento
            const buttonsContainer = document.createElement("div");
            buttonsContainer.classList.add("buttonsContainer");
            const decrementButton = document.createElement("button");
            decrementButton.textContent = "-";
            decrementButton.addEventListener("click", () => decrementarCantidad(product));
            const quantityElement = document.createElement("span");
            quantityElement.textContent = `Cantidad: ${product.quantity || 1}`;
            const incrementButton = document.createElement("button");
            incrementButton.textContent = "+";
            incrementButton.addEventListener("click", () => incrementarCantidad(product));
            buttonsContainer.appendChild(decrementButton);
            buttonsContainer.appendChild(quantityElement);
            buttonsContainer.appendChild(incrementButton);

            // Contenedor para textContainer y buttonsContainer
            const contentContainer = document.createElement("div");
            contentContainer.classList.add("contentContainer")
            contentContainer.appendChild(textContainer);
            contentContainer.appendChild(buttonsContainer);

            // Agregar contenedores al listItem
            listItem.appendChild(imageContainer);
            listItem.appendChild(contentContainer);


            // Agregar listItem a la lista del carrito
            carritoLista.appendChild(listItem);
        });
    } else {
      // Si el carrito está vacío, muestra un mensaje
      carritoLista.innerHTML = "<p>El carrito está vacío.</p>";
    }

    // Función para incrementar la cantidad del producto
    function incrementarCantidad(product) {
      // Verificar si la propiedad 'quantity' existe y es un número
      if (typeof product.quantity === 'number') {
        product.quantity += 1;
      } else {
        // Si no existe o no es un número, establecerla en 1
        product.quantity = 1;
      }

      // Llamar a la función para actualizar el carrito
      actualizarCarrito();
    }

    // Función para decrementar la cantidad del producto
    function decrementarCantidad(product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        // Si la cantidad es 1 o menos, eliminar el producto del carrito
        carrito.splice(carrito.indexOf(product), 1);
      }
      actualizarCarrito();
    }

    // Actualiza el carrito en localStorage y vuelve a mostrarlo
    function actualizarCarrito() {
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    }

    // Agrega un manejador de eventos al botón "Vaciar Carrito"
    const vaciarCarritoButton = document.getElementById("vaciar-carrito");
    vaciarCarritoButton.addEventListener("click", () => {
      // Llama a una función para vaciar el carrito
      vaciarCarrito();
    });

    // Función para vaciar el carrito
    function vaciarCarrito() {
      // Elimina los ítems del carrito desde el localStorage
      localStorage.removeItem("carrito");

      // Limpia la lista en la página
      carritoLista.innerHTML = "<p>El carrito está vacío.</p>";
    }

    mostrarCarrito(); // Asegurarse de que se muestre el carrito al cargar la página
});