var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var bower = require('bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// BOWER INSTALL
gulp.task('bower', function(cb){
  bower.commands.install([], {save: true}, {})
    .on('end', function(installed){
      cb(); // notify gulp that this task is finished
    });
});

// SCSS
gulp.task('styles', function () {
  return sass('app/scss/style.scss', { sourcemap: true })
    .on('error', sass.logError)
    .pipe(prefix({
    	browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
    	cascade: false
    }))
    // For inline sourcemaps
    .pipe(sourcemaps.write())

    // For file sourcemaps
    .pipe(sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'source'
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(livereload());
});

// JAVASCRIPT
gulp.task('scripts', function() {
  return gulp.src([
    './app/js/vendor/*.js',
    './app/js/module/*.js',
    './app/js/scripts.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload());
});

// HTML
gulp.task('html', function() {
    return gulp.src([
        './index.html'
    ])
    .pipe(livereload());
});

gulp.task('default',function() {
	livereload.listen();
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.scss',['styles']);
  gulp.watch('*.html', ['html']);
});