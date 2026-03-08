const formularioBusqueda = document.querySelector(".search-form");
const inputBusqueda = document.getElementById("search-box");

if(formularioBusqueda){

formularioBusqueda.addEventListener("submit",function(e){

e.preventDefault();

let texto = inputBusqueda.value.trim().toLowerCase();

if(texto.length === 0) return;

window.location.href =
`../productos/productos.html?buscar=${encodeURIComponent(texto)}`;

});

}