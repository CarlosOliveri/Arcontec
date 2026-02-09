import gulp from 'gulp';
const { src, dest, watch, series, parallel } = gulp;
import sass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from'autoprefixer';
import postcss  from 'gulp-postcss';
import sourcemaps  from 'gulp-sourcemaps';
import cssnano  from 'cssnano';
import concat  from 'gulp-concat';
import terser  from 'gulp-terser-js';
import rename  from 'gulp-rename';
import imagemin  from 'gulp-imagemin'; // Minificar imagenes 
import notify  from 'gulp-notify';
import cache  from 'gulp-cache';
import clean  from 'gulp-clean';
import webp  from 'gulp-webp';


const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*'
}

function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('static/css'));
}

function javascript() {
    return src(paths.js)
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(terser())
      .pipe(sourcemaps.write('.'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest('static/js'))
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(cache(imagemin({ optimizationLevel: 3 })))
        .pipe(dest('static/img'))
        .pipe(notify('Imagen Completada' ));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('static/img'))
        .pipe(notify({ message: 'Imagen Completada' }));
}


function watchArchivos() {
    watch(paths.scss, css);
    watch(paths.js, javascript);
    watch(paths.imagenes, imagenes);
    watch(paths.imagenes, versionWebp);
}

export default css();
export default watchArchivos();
export default  parallel(css, javascript, imagenes, versionWebp, watchArchivos);