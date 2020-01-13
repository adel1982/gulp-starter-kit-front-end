// Init modules
const gulp= require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
// const concat = require('gulp-concat');
// const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

// File paths
const files = {
  scssPath: 'src/scss/**/*.scss',
  jsPath: 'src/js/**/*.js'
};

// Sass task
function style() {
  return gulp.src(files.scssPath)
    .pipe(sourcemaps.init()) 
    .pipe(sass()) 
    .pipe(postcss([autoprefixer(), cssnano()])) 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// JS task
// function jsTask() {
//   return src([
//     files.jsPath
//     //,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
//   ])
//     .pipe(concat('all.js'))
//     .pipe(uglify())
//     .pipe(dest('dist'));
// }

// Cachebust
// var cbString = new Date().getTime();
// function cacheBustTask() {
//   return src(['index.html'])
//     .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//     .pipe(dest('.'));
// }

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('src/scss/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);

}

exports.style = style;
exports.watch = watch;
