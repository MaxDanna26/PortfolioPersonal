const { src,dest,watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done){
    src('src/scss/**/*.scss') // Identifico el archivo
        .pipe( plumber() )
            .pipe( sass() )          // Compila
                .pipe(dest('build/css')); // Almacena

    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css)



    done();
}


exports.css = css;
exports.dev = dev;

