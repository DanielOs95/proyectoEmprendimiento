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



let products = document.querySelector('.products');
let categories = document.querySelector('.categories');
let resenas = document.querySelector('.review');
let blogs = document.querySelector('.blogs');


const mostrarOcultar = () => {
    products.classList.remove('active');
    categories.classList.remove('active');
    resenas.classList.remove('active');
    blogs.classList.remove('active');
}

/*MOSTRAR Y OCULTAR PRODUCTOS*/
document.querySelector('.show-products').onclick = (e) => {
    e.preventDefault()
    mostrarOcultar()
    products.classList.toggle('active');
}

/*MOSTRAR Y OCULTAR CATEGORIAS*/
document.querySelector('.show-categories').onclick = (e) => {
    e.preventDefault()
    mostrarOcultar()
    categories.classList.toggle('active')
}

/*MOSTRAR Y OCULTAR RESENAS*/
document.querySelector('.show-review').onclick = (e) => {
    e.preventDefault()
    mostrarOcultar()
    resenas.classList.toggle('active')
}

/*MOSTRAR Y OCULTAR NUESTRO BLOGS*/
document.querySelector('.show-blogs').onclick = (e) => {
    e.preventDefault()
    mostrarOcultar()
    blogs.classList.toggle('active')
}


/*MOSTRAR Y OCULTAR */



/*SLIDER DE PRODUCTOS PANTALLA PRINCIPAL*/
var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay:{
        delay: 7500,
        disableOnInteraction: false,
    },
    breakpoints:{
        0:{
            slidesPerView: 1,
           
        },
        768:{
            slidesPerView: 2,
            
        },
        1020:{
            slidesPerView: 3,
        },
    },
});


/*SLIDER DE REVIEWS */
var swiper = new Swiper(".review-slider", {
    loop: true,
    spaceBetween: 20,
    autoplay:{
        delay: 7000,
        disableOnInteraction: false,
    },
    breakpoints:{
        0:{
            slidesPerView: 1,
           
        },
        768:{
            slidesPerView: 2,
            
        },
        1020:{
            slidesPerView: 3,
        },
    },
});



const cart = document.querySelector('.shopping-cart')

if (cart.querySelectorAll('.box').length === 0) {
    console.log('el carrito esta vacio');
}

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

        

        nuevoContenido.querySelector('.fa-trash').addEventListener('click', () =>{
            nuevoContenido.remove()
        })
        
    })
});





