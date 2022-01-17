document.addEventListener('DOMContentLoaded', function(){ //* Recordemo que el DOMContentLoaded nos permite ejecutar funciones una vez haya cargado todo el DOM y puede recibir acciones de js
    iniciarApp();
})

function iniciarApp() {   //* Arrancamos nuestra app. Una vez inice una función que pueda iniciar otra función se aligera un poco el contentLoaded.
    crearGaleria();       //* Cómo vamos a usar varias funciones, primero las llamamos desde el addEventListener y luego las podemos llamar por otras funcionees.
}

//? Añadimos imagenes
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');    //* Hacemos el selector
    
    for(let i = 1; i <= 12; i++) {  //* inciamos en 1 porque es el nombre de la primera imagen.
        const imagen = document.createElement('picture');  //* Creamos el elemento
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif"> 
            <source srcset="build/img/thumb/${i}.webp" type="image/webp"> 
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen vocalista">
        `;
        imagen.onclick = function() { //* Con el onclik podemos identificar a que le estamos dando click
            mostrarImagen(i);
        }

        galeria.appendChild(imagen); //* Recordemos que el appenChild nos agrega un elemento al final.
    }
}

//? agrandamos la imagen con un clik
function mostrarImagen(id) {
    //* Es lo mismo de como mostramos las imagenes pequeñas, solo se activa con un clik y muestra las mas grandes
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif"> 
        <source srcset="build/img/grande/${id}.webp" type="image/webp"> 
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen vocalista">
    `;

//* Creamos un div para poder oscurecer la pantalla al momento de agrandar la imagen, mas conocido como overlay.
    const overlay  = document.createElement('DIV');
    overlay.appendChild(imagen); //* agregamos la imagen 
    overlay.classList.add('overlay'); //* Le damos una clase para poder aplicar css
    overlay.onclick = function() {      //* Con este evento podemos dar click en cualdquier parte fuera del overlay y cerrar la imagen
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.remove('fijar-body'); 
        overlay.remove(); //* Cerramos o removemos el overlay. Remove es un metodo de js.

    }
//* Cerrar ventana modal
    const cerraModal = document.createElement('P'); //* Creamos un parrafo
    cerraModal.textContent = 'X';                   //* Añadimos la X para poder cerrar la ventana
    cerraModal.classList.add('btn-cerrar');         //* Agregamos la clase al parrafo para poder aplicarle CSS
    cerraModal.onclick = function(){
        const body = document.querySelector('body');
        body.appendChild(overlay);                  //* Con este query y appendChild agregamos el overlay en el body
        body.classList.remove('fijar-body');        
        overlay.remove();  
    }
    overlay.appendChild(cerraModal); //* Lo agregamos al overlay para poder visaulizarlo 

    const body = document.querySelector('body');
    body.appendChild(overlay); 
    body.classList.add('fijar-body'); 
}