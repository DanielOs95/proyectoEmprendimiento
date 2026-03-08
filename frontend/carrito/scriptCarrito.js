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

        calcularTotales();
        return;
    }

    general.forEach(producto => {

        const productoMostrar = document.createElement("div");
        productoMostrar.className = "contenedorCarrito";

        let textoCantidad = "";

        if(producto.tipo === "kilo"){
            textoCantidad = "cantidad en kg:";
        }

        if(producto.tipo === "pieza"){
            textoCantidad = "cantidad en piezas:";
        }

        if(producto.tipo === "precio"){
            textoCantidad = "monto solicitado:";
        }

        productoMostrar.innerHTML = `
            <img src="${producto.imagen}" alt="" class="imgCarrito">
            <div class="contenido">
                <h3>${producto.titulo}</h3>

                ${
                    producto.tipo !== "precio"
                    ? `<span class="precio">Precio por kilo: $${producto.precio}</span>`
                    : `<span class="precio">Monto elegido: $${producto.precio}</span>`
                }

                <div class="cantidad-tipo">${textoCantidad}</div>

                <div id="contenedor">
                    <button class="sumar"> + </button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="restar"> - </button>
                </div>

            </div>

            <i class="fas fa-trash borrar"></i>
        `;

        const btnSumar = productoMostrar.querySelector(".sumar");
        const btnRestar = productoMostrar.querySelector(".restar");

        // Si es por monto no se modifica cantidad
        if(producto.tipo === "precio"){
            btnSumar.style.display = "none";
            btnRestar.style.display = "none";
        }

        btnSumar.addEventListener("click", () => {

            producto.cantidad++;

            productosGuardados();
            mostrarProductos();

        });

        btnRestar.addEventListener("click", () => {

            if (producto.cantidad > 1) {

                producto.cantidad--;

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

    calcularTotales();
}

mostrarProductos();

function calcularTotales(){

    let subtotal = 0;

    general.forEach(producto => {

        if(producto.tipo === "precio"){

            subtotal += Number(producto.precio);

        }else{

            subtotal += Number(producto.precio) * Number(producto.cantidad);

        }
        

        /*if(producto.tipo === "precio"){

            subtotal += producto.precio;

        }else{

            subtotal += producto.precio * producto.cantidad;

        }*/

    });

    let iva = subtotal * 0.16;

    let envio = general.length > 0 ? 35 : 0;

    let total = subtotal + iva + envio;

    document.getElementById("subtotal").innerText = "$" + subtotal.toFixed(2);
    document.getElementById("iva").innerText = "$" + iva.toFixed(2);
    document.getElementById("envio").innerText = "$" + envio.toFixed(2);
    document.getElementById("total").innerText = "$" + total.toFixed(2);
}

document.getElementById("pago-efectivo").addEventListener("click", () => {

    const pedido = {

        productos: general,

        subtotal: document.getElementById("subtotal").innerText,

        iva: document.getElementById("iva").innerText,

        envio: document.getElementById("envio").innerText,

        total: document.getElementById("total").innerText,

        metodoPago: "efectivo",

        estadoPago: "pendiente",

        fecha: new Date().toLocaleString()

    };

    console.log("Pedido generado:", pedido);

    alert("Pedido realizado. Pago contra entrega.");

});

document.getElementById("pago-tarjeta").addEventListener("click", () => {

    alert("El pago con tarjeta estará disponible próximamente");

});