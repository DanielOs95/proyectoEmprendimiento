/*SLIDER DE PRODUCTOS PANTALLA PRINCIPAL*/
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
});









/*var swiper = new Swiper(".product-slider", {
    spaceBetween: 10,

    // Activamos el grid
    grid: {
        rows: 2,       // Número de filas
        fill: 'row',   // Cómo llenar los slides: 'row' o 'column'
    },

    breakpoints: {
        0: {       // CELULAR
            slidesPerView: 1,
            //grid: { rows: 4 }  // 2 filas en celular
        },
        768: {     // TABLET
            slidesPerView: 1,
            //grid: { rows: 4 }  // 2 filas en tablet
        },
        1024: {    // COMPUTADORA
            slidesPerView: 3,
            grid: { rows: 3 }  // 3 filas en escritorio
        }
    }
});*/
