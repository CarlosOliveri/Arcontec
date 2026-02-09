import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;

import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';
import concat from 'gulp-concat';
import terser from 'gulp-terser-js';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import notify from 'gulp-notify';
import cache from 'gulp-cache';
import clean from 'gulp-clean';
import webp from 'gulp-webp';

// Inicializar gulp-sass con dart-sass
const sass = gulpSass(dartSass);

const paths = {
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  imagenes: 'src/img/**/*'
};

// Compilar SCSS
function cssTask() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('static/css'));
}

/* // JavaScript
function javascriptTask() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    //.pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('static/js'));
} */

// Optimizar imágenes
function imagenesTask() {
  return src(paths.imagenes)
    .pipe(cache(imagemin({ optimizationLevel: 3 })))
    .pipe(dest('static/img'))
    .pipe(notify('Imagen Completada'));
}

// Crear WebP
function versionWebpTask() {
  return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('static/img'))
    .pipe(notify({ message: 'Imagen Completada' }));
}

// Watch
function watchArchivos() {
  watch(paths.scss, cssTask);
  //watch(paths.js, javascriptTask);
  watch(paths.imagenes, imagenesTask);
  watch(paths.imagenes, versionWebpTask);
}

// Exportar tareas
//export { cssTask, javascriptTask, imagenesTask, versionWebpTask, watchArchivos };
export { cssTask, imagenesTask, versionWebpTask, watchArchivos };

// Tarea por defecto
//export default parallel(cssTask, javascriptTask, imagenesTask, versionWebpTask, watchArchivos);
export default parallel(cssTask, imagenesTask, versionWebpTask, watchArchivos);
