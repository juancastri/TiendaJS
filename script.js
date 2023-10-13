//Obtener los productos de la API
async function ObtenerProductos() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) { // Verificar si la respuesta no está ok
            throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        return data; // Devolver los datos obtenidos
    } catch (error) {
        console.error(error);
        return []; // Devolver un array vacío o un valor por defecto en caso de error
    }
}

//CARDS
document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.querySelector(".contenedor");
    const products = await ObtenerProductos(); // Esperar a que la función ObtenerProductos termine

    if (products.length > 0) {
        let productos = "";
        products.forEach(product => {
            productos += `
                <div class="card" style="width: 18rem">
                    <img src="${product.image}" class="image"/>
                    <div class="card-body">
                        <h3 class="card-title">${product.title}</h3>
                        <p class="card-text">${product.description}</p>
                        <h2>${product.price}</h2>
                        <div class="box">
                            <button>Ver detalle</button>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedor.innerHTML = productos;
    } else {
        contenedor.innerHTML = "No se encontraron productos.";
    }
});
