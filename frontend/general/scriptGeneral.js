/*MOSTRAR Y OCULTAR BUSCADOR*/
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

/*MOSTRAR Y OCULTAR CARRITO DE COMPRAS*/
let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

/*MOSTRAR Y OCULTAR REGISTRO DE USUARIOS*/
let loginForm = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

/*MOSTRAR Y OCULTAR MENU HAMBURGUESA*/
let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}


/*OCULTAR SI OTRA OPCION ESTA DESPLEGADO*/
window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}


//FUNCION PARA CREAR LA VENTANA MODAL
function mostrarModal(producto, opciones = ["kilo","pieza","pesos"]) {

    const modalExistente = document.querySelector('.modal-popup');
    if (modalExistente) modalExistente.remove();

    const modal = document.createElement('div');
    modal.classList.add('modal-popup');

    modal.innerHTML = `
    <div class="modal-content">
        <h2>${producto.titulo}</h2>

        <div class="tipo-compra">
            ${opciones.includes("kilo") ? `<button data-tipo="kilo">Por Kilo</button>` : ""}
            ${opciones.includes("pieza") ? `<button data-tipo="pieza">Por Pieza</button>` : ""}
            ${opciones.includes("pesos") ? `<button data-tipo="pesos">Por monto</button>` : ""}
        </div>

        <div class="input-cantidad" style="display:none;">
            <input type="number" min="0.1" step="0.1" placeholder="Cantidad" />
            <p class="nota-compra"></p>
        </div>

        <div class="botones-modal" style="display:none;">
            <button class="aceptar">Aceptar</button>
            <button class="cancelar">Cancelar</button>
        </div>
    </div>
`;
    document.body.appendChild(modal);

    const botonesTipo = modal.querySelectorAll(".tipo-compra button");
    const inputContainer = modal.querySelector(".input-cantidad");
    const inputField = modal.querySelector(".input-cantidad input");
    const botonesFinal = modal.querySelector(".botones-modal");
    const nota = modal.querySelector(".nota-compra");

    let tipoSeleccionado = null;

    botonesTipo.forEach(btn => {

    btn.addEventListener('click', () => {

        botonesTipo.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        tipoSeleccionado = btn.dataset.tipo;

        inputContainer.style.display = "block";
        botonesFinal.style.display = "flex";

        nota.style.display = "block";

        if(tipoSeleccionado === "kilo"){
            inputField.placeholder = "Ingrese kilos";
            nota.textContent = "⚠ El peso final puede variar ligeramente al momento de preparar su pedido.";
        }

        if(tipoSeleccionado === "pieza"){
            inputField.placeholder = "Ingrese piezas";
            nota.textContent = "";
            nota.style.display = "none";
        }

        if(tipoSeleccionado === "pesos"){
            inputField.placeholder = "Ingrese monto en $";
            nota.textContent = "⚠ La cantidad final de producto puede variar ligeramente según el peso.";
        }

    });

});

    modal.querySelector(".aceptar").addEventListener('click', () => {

        const cantidad = parseFloat(inputField.value);

        if(!tipoSeleccionado || !cantidad || cantidad <= 0){
            alert("Seleccione una opción y escriba un valor válido");
            return;
        }

        let precioBase = parseFloat(producto.precio.replace(/[^0-9.]/g,""));
        let precioFinal = precioBase;

        if(tipoSeleccionado === "kilo") precioFinal = precioBase * cantidad;
        if(tipoSeleccionado === "pieza") precioFinal = precioBase * cantidad;
        if(tipoSeleccionado === "pesos") precioFinal = cantidad;

        let existeONo = carritoGeneral.some(p => p.titulo === producto.titulo);

        if(existeONo){
            mostrarMensaje("❌ Este producto ya fue agregado");
            modal.remove();
            return;
        }

        carritoGeneral.push({
            imagen: producto.imagen,
            titulo: producto.titulo,
            precio: tipoSeleccionado === "pesos" ? precioFinal.toFixed(2) : precioBase.toFixed(2),
            cantidad: tipoSeleccionado === "pesos" ? 1 : cantidad,
            tipo: tipoSeleccionado
        });

        guardarProductos();
        actualizarCarrito();
        mostrarMensaje("✔ Producto agregado");

        modal.remove();
    });

    modal.querySelector(".cancelar").addEventListener('click', () => modal.remove());
}


//AGREGAR PRODUCTOS AL CARRITO
const cart = document.querySelector('.shopping-cart');

let carritoGeneral = JSON.parse(localStorage.getItem("carrito")) || [];

const actualizarCarrito = () => {
    document.getElementById("contador-carrito").textContent = carritoGeneral.length;
};

const guardarProductos = () => {
    localStorage.setItem("carrito", JSON.stringify(carritoGeneral));
}

const mostrarMensaje = (textoMensaje) => {

    const mensaje = document.createElement("div");

    mensaje.textContent = textoMensaje;
    mensaje.style.position = "fixed";
    mensaje.style.top = "20px";
    mensaje.style.right = "20px";
    mensaje.style.background = "#717070ff";
    mensaje.style.color = "#fff";
    mensaje.style.padding = "10px 20px";
    mensaje.style.borderRadius = "5px";
    mensaje.style.zIndex = "9999";

    document.body.appendChild(mensaje);

    setTimeout(() => mensaje.remove(), 1200);
};


document.querySelectorAll('.btn-cart').forEach(button => {

    button.addEventListener('click', (e) => {

        e.preventDefault();

        let cajaProducto = button.closest('.box')

        let imagen = cajaProducto.querySelector('img').src;
        let titulo = cajaProducto.querySelector('h3').innerText;
        let precio = cajaProducto.querySelector('.price').innerText;

         //VALIDAR SI YA EXISTE
        let existeONo = carritoGeneral.some(p => p.titulo === titulo);

        if(existeONo){
            mostrarMensaje("❌ Este producto ya fue agregado");
            return; // 🚨 aquí se detiene y NO abre el modal
        }

        //Opciones por producto
        let opciones = ["kilo","pieza","pesos"];

        if(titulo.toLowerCase().includes("carne")){
            opciones = ["kilo","pesos"];
        }

        mostrarModal({
            imagen,
            titulo,
            precio
        }, opciones);

    });

});


document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    cargarProductosEnHeader();
});

















