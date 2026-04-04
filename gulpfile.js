// gulpfile.js
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCss = require('gulp-clean-css');
const del = require('del').deleteAsync;
const browserSync = require('browser-sync').create();

// Rutas 
const paths = {
  htmlRoot: './*.html',
  htmlDir: 'HTML/**/*.html',
  scssAll: 'SRC/SCSS/**/*.scss',
  scssEntry: 'SRC/SCSS/app.scss',
  cssOut: 'build/css',
  jsAll: 'SRC/JS/**/*.js',
};

// Limpiar build
function clean() {  
  return del([`${paths.cssOut}/**/*`]);
}

// Estilos 
function stylesDev() {
  return src(paths.scssEntry, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.cssOut))
    .pipe(browserSync.stream());
}

// Estilos
function stylesBuild() {
  return src(paths.scssEntry, { allowEmpty: true })
    .pipe(plumber())
    .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCss({ level: 2 }))
    .pipe(dest(paths.cssOut));
}

// Servidor + Watch
function server() {
  browserSync.init({
    server: { baseDir: './' },
    open: true,
    notify: false
  });

  watch(paths.scssAll, stylesDev);
  watch(paths.htmlRoot).on('change', browserSync.reload);
  watch(paths.htmlDir).on('change', browserSync.reload);
  watch(paths.jsAll).on('change', browserSync.reload);
}

exports.dev = series(clean, stylesDev, server);
exports.build = series(clean, stylesBuild);