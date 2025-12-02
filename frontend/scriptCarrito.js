/*MOSTRAR Y OCULTAR BUSCADOR*/
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

/*MOSTRAR Y OCULTAR CARRITO DE COMPRAS
let shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}*/

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


//AGREGAR PRODUCTOS AL CARRITO
const cart = document.querySelector('.shopping-cart');

const actualizarCarrito = () => {
    const contador = cart.querySelectorAll('.box').length;
    document.getElementById("contador-carrito").textContent = contador;
};

document.querySelectorAll('.btn-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        let cajaProducto = button.closest('.box')

        let imagen = cajaProducto.querySelector('img').src;
        let titulo = cajaProducto.querySelector('h3').innerText;
        let precio = cajaProducto.querySelector('.price').innerText;

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
        actualizarCarrito();

        nuevoContenido.querySelector('.fa-trash').addEventListener('click', () =>{
            nuevoContenido.remove();
            actualizarCarrito();
        })
        
    })
});