const   gulp            = require('gulp'),
        uglify          = require('gulp-uglify'),
        rename          = require('gulp-rename'),
        browserSync     = require('browser-sync').create(),
        eslint          = require('gulp-eslint'),
        sass            = require('gulp-sass'),
        autoprefixer    = require('gulp-autoprefixer'),
        cssnano         = require('gulp-cssnano'),
        prettyError     = require('gulp-prettyerror'),
        cleanCSS        = require('gulp-clean-css'),
        plumber         = require('gulp-plumber'),
        notify          = require('gulp-notify');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function(){
   gulp.src('./assets/src/scss/style.scss') 
      .pipe(plumber()) // avoid gulp crash 
      .pipe(prettyError()) // pretty css
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest('./assets/src/css/')) //convert files .scss => .css
      .pipe(cleanCSS())
      .pipe(cssnano())
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./dest/assets/src/css/'));
});

let errorHandler = {
    errorHandler: notify.onError({
    title: 'daidad',
    message: 'Error: <%= error.message %>'
  })
};

gulp.task('scripts', function(){
    gulp.src('./assets/src/js/*.js')
      .pipe(plumber(errorHandler)) // avoid gulp crash 
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(gulp.dest('./dest/assets/src/js'))
});

//  reload 
gulp.task('reload', function(){
    browserSync.reload();
})
  
// watch the js Folder and RUN SCRIPTS
gulp.task('watch', function() {
    gulp.watch('./assets/src/js/*.js', ['scripts', 'reload']);
    gulp.watch(['./assets/src/scss/*.scss'],['sass', 'reload']);
    gulp.watch("./*.html",['reload']);
 });

// Modify our default task method by passing an array of task names
gulp.task('default', [ 'watch','browser-sync']);