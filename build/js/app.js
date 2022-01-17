document.addEventListener('DOMContentLoaded', function(){ //* Recordemo que el DOMContentLoaded nos permite ejecutar funciones una vez haya cargado todo el DOM y puede recibir acciones de js
    iniciarApp();
})

function iniciarApp() {   //* Arrancamos nuestra app. Una vez inice una función que pueda iniciar otra función se aligera un poco el contentLoaded.
    crearGaleria();       //* Cómo vamos a usar varias funciones, primero las llamamos desde el addEventListener y luego las podemos llamar por otras funcionees.
    scrollNav();
    navFija();
}


//? Navegacion fija
function navFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival'); 
    
    window.addEventListener('scroll', function(){ //* recordemos que el window selecciona o apunta al DOM ya cargado. Cada vez que hagamos srcoll estaremos esuchando algo.

        if( sobreFestival.getBoundingClientRect().bottom <-0) { //* Este metodo nos sirve para identificar la posicion del elemento que hayamos seleccionado. Nos da toda la información para saber la posición exacta en el DOM. Con el botton estamos indicando que cuando toque la parte inferior del elemento selcciondo con la parte superior del DOM(donde ya encontramos la barra de marcador del browser) va a poder ejecutar la función o acción que querramos.
            barra.classList.add('fijo'); //* Cuando toque el botton del elemento agregar la clase fijo
        }else{
            barra.classList.remove('fijo'); //* cuando ya pase el bottom del elemento elimina la clase
        }
    })

}

//? Smooth Srcoll
function scrollNav() {

    //* Leemos los enlaces
    const enlace = document.querySelectorAll('.navegacion-principal a');
    enlace.forEach( enlace => { //* toca iterar en cada uno de los enlace ya que no se puede asociar una funcion a un queryselectorall.
        enlace.addEventListener('click', function(e){
            e.preventDefault(); //* con esto prevenimos el comportamiento por default de la funcioon
            
            const seccionScroll = e.target.attributes.href.value //* target.attributes nos sirve para leer atributo y con href.value nos traemos el valor solo del atributo href
            const seccion = document.querySelector(e.target.attributes.href.value); //* aquí ya hemos instansiado la sección donde va a llegar el scroll.
            seccion.scrollIntoView({ behavior: "smooth"});
        })
    });
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