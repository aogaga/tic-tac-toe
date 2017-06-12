const gulp = require('gulp');
const jade = require('gulp-jade');
const plumber = require('gulp-plumber');
const $    = require('gulp-load-plugins')();
const browserSync =  require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');  
const uglify = require('gulp-uglify');






// task to lauch server
gulp.task('serve', function(){
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

});


gulp.task('js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
}); // task to compile javascript




gulp.task('css', function() {
    gulp.src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./build/css"));
}); // task to compilte and process csss




// task to compile pug template
gulp.task('template', function(){

    return gulp.src('src/jade/**/*.pug')
        .pipe(pug({

            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))

        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest("./build"))
        .pipe(browserSync.reload({
            stream: true
        }))

});




gulp.task('default', ['css','js', 'template','serve'], function() {
    gulp.watch(['./src/scss/**/*.scss'], ['css']);
    gulp.watch('./src/jade/**/*.pug', ['template']);
    gulp.watch(['./src/scss/**/*.scss'], browserSync.reload);
    gulp.watch(['./src/scss/**/*.scss'], browserSync.reload);

});
