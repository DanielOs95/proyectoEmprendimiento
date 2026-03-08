/*SLIDER DE PRODUCTOS PANTALLA PRINCIPAL
var swiper = new Swiper(".product-slider", {
    loop: true,
    spaceBetween: 10,
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
});*/

const contenedor = document.querySelector("#products-container .swiper-wrapper");

const params = new URLSearchParams(window.location.search);

let textoBuscar = params.get("buscar") || "";

textoBuscar = textoBuscar
.toLowerCase()
.trim()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"");

contenedor.innerHTML = "";

const resultados = productos.filter(p => {

const nombre = p.nombre
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"");

const categoria = p.categoria
.toLowerCase()
.normalize("NFD")
.replace(/[\u0300-\u036f]/g,"");

return nombre.includes(textoBuscar) || categoria.includes(textoBuscar);

});

if(resultados.length === 0){

contenedor.innerHTML = `
<div style="padding:50px;text-align:center;width:100%">
<h2>No se encontraron productos</h2>
<p>Intenta buscar otro producto</p>
</div>
`;

}else{

resultados.forEach(p => {

contenedor.innerHTML += `

<div class="swiper-slide box">

<img src="${p.imagen}" alt="${p.nombre}" loading="lazy">

<h3>${p.nombre}</h3>

<div class="price">$${p.precio.toFixed(2)}</div>

<div class="stars">
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star"></i>
<i class="fas fa-star-half-alt"></i>
</div>

<a href="#" class="btn btn-cart">Agregar al carrito</a>

</div>

`;

});

}

new Swiper(".product-slider",{

loop:true,

spaceBetween:10,

autoplay:{
delay:7500,
disableOnInteraction:false
},

breakpoints:{
0:{slidesPerView:1},
768:{slidesPerView:2},
1020:{slidesPerView:3}
}

});