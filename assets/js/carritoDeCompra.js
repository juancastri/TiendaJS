document.addEventListener("DOMContentLoaded", () => {
    // Obtén el carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito"));

    // Obtén el elemento de la lista del carrito
    const carritoLista = document.getElementById("carritoLista");

    if (carrito && carrito.length > 0) {
      // Recorre los productos en el carrito y muestra cada uno en la lista
        carrito.forEach((product) => {
            const listItem = document.createElement("li");
            listItem.textContent = product.title;
            carritoLista.appendChild(listItem);
        });
    } else {
      // Si el carrito está vacío, muestra un mensaje
      carritoLista.innerHTML = "<p>El carrito está vacío.</p>";
    }
});