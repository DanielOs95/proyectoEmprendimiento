/*MOSTRAR Y OCULTAR BUSCADOR*/
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

/*MOSTRAR Y OCULTAR MENU HAMBURGUESA*/
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

/*OCULTAR SI OTRA OPCION ESTA DESPLEGADO*/
window.onscroll = () => {
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}



let general = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.getElementById('contenedor-carrito');

const productosGuardados = () => {
    localStorage.setItem("carrito", JSON.stringify(general));
}


const mostrarProductos = () => {
    contenedor.innerHTML = "";

    if (general.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <h2>🛒 Tu carrito está vacío</h2>
                <p>Agrega productos para iniciar tu compra</p>
            </div>
        `;

        return;
    }
    
    
    general.forEach(producto => {
        const productoMostrar = document.createElement("div");
        productoMostrar.className = "contenedorCarrito";

         productoMostrar.innerHTML = `
                <img src="${producto.imagen}" alt="" class="imgCarrito">
                <div class="contenido">
                    <h3>${producto.titulo}</h3>
                    <span class="precio"> Precio por kilo: ${producto.precio}</span>
                    <div class="cantidad-tipo"> cantidad en ${producto.tipo}:</div>
                    <div id="contenedor">
                        <button class="sumar"> + </button>
                        <span class="cantidad">${producto.cantidad}</span>
                        <button class="restar"> - </button>
                    </div>
                </div>
                <i class="fas fa-trash borrar"></i>
        `;
        productoMostrar.querySelector(".sumar").addEventListener("click", () => {
            producto.cantidad++;
            productosGuardados();
            mostrarProductos();
        });

        productoMostrar.querySelector(".restar").addEventListener("click", () => {
            if (producto.cantidad > 1) {
                producto.cantidad --;
            } else {
                general = general.filter(p => p.titulo !== producto.titulo);
            }
            productosGuardados();
            mostrarProductos();
        });

        productoMostrar.querySelector(".borrar").addEventListener("click", () => {
            general = general.filter(p => p.titulo !== producto.titulo);
            
            productosGuardados();
            mostrarProductos();
        });
        contenedor.appendChild(productoMostrar);
    }); 

};

mostrarProductos();

