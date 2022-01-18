/* //! GULP
// Las tareas de gulp son funciones de JS, se conectan con la api de gulp realizando ciertas acciones.
//* Estas tareas se usan para compilar código de sass, mejorar código de js, aligerar múltimedia.

function tarea( done) {                    //* Definimos la tarea y le damos un nombre. Le damos el bombre a la función en este caso se llama tarea y como parametro done.
    console.log('Desde la primera tarea');

    done(); //* Acá llamamos a la función para indicarle a gulp que debe finalizarla.
}

function tarea2(done){ //? se pueden tener multiples tareas.
    console.log('desde la segunda tarea');

    done();
}

//? la llamamos con el comando gulp + nombre de la tarea en el terminal de VSC

//? gulp son tareas repetitivas, toca finalizarla con un callback Todas las tareas  de gulp toman un callback automaticamente.


exports.tarea = tarea; //Para poder ejecutar la tarea debemos hacerla disponible y para eso la exportamos con exports. + el bombre que queramos darle = el nombre de la función  */


//! Compilando Sass con gulp.
const { src, dest, watch, parallel} = require('gulp'); //? Cuando tenemos la constaten entre llaves quiere decir que vamos a exportar o retornar multiples funciones. src para compilar y dest para almancenar. El watch nos sirve para estar escuchando cambios.

//? CSS
const sass = require('gulp-sass')(require('sass'))//instalamos las dependencias. Recordar que esto es sintaxis de NodeJs no de gulp ya estas dependencias estan instaladas y podemos ir instalando las que necesitamos. Tenemos que expesificar el requiere hacia sass
const plumber = require('gulp-plumber');
//* Estos 3 nos ayudaran a mejorar el código CSS. No tiene gulp- porque funcionan con CSS.
const autoprefixer = require('autoprefixer'); //* autoprefixer se encargará de que funcione en cualquier navegador.
const cssnano = require('cssnano');           //* cssnano comprime nuestro código de css
const postcss = require('gulp-postcss');      //* transforma el código por medio de los dos anterioes
const sourcemaps = require('gulp-sourcemaps') //* esta función  nos sirve para poder depurar en el navegador en los fuentes a partir de los compilados o minificados.

//? IMAGENES
const cache = require('gulp-cache'); //* procesas imagenes en jpg requiere tenerlas en cache, por eso usamos esta dependencia 
const imagemin = require('gulp-imagemin'); //* crear imagenes jpg menos pesadas
const webp = require('gulp-webp'); //* crear imagenes wepb
const avif =  require('gulp-avif'); //* crear imagenes avif

//* Primera tarea


function css(done) {

    //? Tres pasos necesarios para compilar SASS

    //* 1. identificar el arcchivo sass a compilar
    src('src/scss/**/*.scss') // Primero le damos la función que nos dio gulp para identificarlo y encontrar el archivo a compilar. Con los * le dammos a enteder que debe compilar todos los archivos con extensiones .scss
    //* 2. Compilar el archivo
        .pipe(sourcemaps.init()) //* iniciamos el sourcemaps
        .pipe(plumber()) // Este nos sirve para que no se detenga por errores, simplemente nos indique en la terminal cual es el error y siga escuchando cambios.
        .pipe(sass()) // pipe manda la señal y compila con la función de sass, lo mantiene en memoria un momento, pero toca guardarlo proque sino se consume toda la memoria.
        .pipe(postcss([autoprefixer(), cssnano()  ])) //* mejor de css
        .pipe(sourcemaps.write('.')) //* Ubicaicón donde lo vamos a guardar. Usamos el punto . para que sea la misma ubicación de estilos del CSS.
        
        
    //* 3. Almacenarlo
        .pipe(dest('build/css')) // con dest almacenamos en disco duro.
    done();
}

//? CREANDO IMAGENES JPG
function imagenes(done){
    const opciones = {                //* Opciones que le damos para optimizarlas
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')     //* Los archivos que necesitamos que encuentre, en este caso va a buscar en todas las carpetas dentro de img con todos las imagenes o archivos png y jpg.
    .pipe(cache(imagemin(opciones)))  //* Guardamos las imagenes en cache con al función que nos da gulp con las opciones que le pasamos a la imagen.
    .pipe(dest('build/img'))          //* Guardamos en la carpeta deseada

    done();
}

//? IMAGENES webP
function versionWebp (done){
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') 
    .pipe(webp(opciones)) //* webp no necesita de cache para almacenar imagenes
    .pipe(dest('build/img'))
    done();
}


//? IMAGENES avif
function versionAvif (done){

    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}') 
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

//? JavaScript
//* Con esto compilamos el código de js en la carpeta build, para al momento de desplegarlo no tengamos que subir el código de la app.
function javaScript(done){
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}


//? COMPILANDO SASS
function dev(done){

    watch('src/scss/**/*.scss', css); // primer parametro es el archivo al que daremos wathc y el segundo es la opción.
    watch('src/js/**/*.js', javaScript); // Cuando se ejecute dev queda pendiente de los cambios que haga js y poder llevarlos al build
    done();
}

exports.css = css;
exports.js = javaScript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif,javaScript ,dev); //* PARALLEL nos permite ejecutar tareas al mismo tiempo, hay otra llamada series, pero esta la ejecutan de forma secuencial (una tras de otra)