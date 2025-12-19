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

        let existeONo = carritoGeneral.some(p => p.titulo === titulo);

        if (existeONo) {
            mostrarMensaje("❌ Este producto ya fue agregado");
            return;
        };

        carritoGeneral.push({
            imagen,
            titulo,
            precio,
            cantidad: 1
        });
        guardarProductos();

        let nuevoContenido = document.createElement('div');
        nuevoContenido.classList.add('box');
        nuevoContenido.innerHTML = `
                <i class="fas fa-trash"></i>
                <img src="${imagen}" alt="">
                <div class="content">
                    <h3>${titulo}</h3>
                    <span class="price">${precio}</span>
                    <span class="quantity"> 1</span>
                </div>
        `;

        cart.appendChild(nuevoContenido);
        mostrarMensaje("✔ Producto agregado");
        actualizarCarrito();

        nuevoContenido.querySelector('.fa-trash').addEventListener('click', () =>{
            nuevoContenido.remove();
            carritoGeneral = carritoGeneral.filter(p => p.titulo !== titulo);
            guardarProductos();
            actualizarCarrito();
        })
        
    })
});

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    cargarProductosEnHeader();
});




