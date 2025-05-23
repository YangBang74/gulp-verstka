const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const prettier = require('gulp-prettier').default;

// пути
const paths = {
  html: 'src/*.html',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js',
  images: 'src/images/**/*.{jpg,jpeg,png,svg,gif,webp}',
  fonts: 'src/fonts/**/*.{woff,woff2,ttf,otf}',
  dist: 'dist'
};

// HTML
function html() {
  return src(paths.html)
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

// SCSS
function styles() {
  return src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.dist + '/js'))
    .pipe(browserSync.stream());
}

// Images
function images() {
  return src(paths.images, { encoding: false })
    .pipe(dest(paths.dist + '/images'))
    .pipe(browserSync.stream());
}

// Fonts
function fonts() {
  return src(paths.fonts, { encoding: false })
    .pipe(dest(paths.dist + '/fonts'))
    .pipe(browserSync.stream());
}

// Format with Prettier
function format() {
  return src(['src/**/*.js', 'src/**/*.scss', 'src/**/*.html'], { base: './' })
    .pipe(prettier())
    .pipe(dest('./'));
}

// Watch + Live Reload
function serve() {
  browserSync.init({
    server: {
      baseDir: paths.dist
    }
  });

  watch(paths.html, html);
  watch(paths.scss, styles);
  watch(paths.js, scripts);
  watch(paths.images, images);
  watch(paths.fonts, fonts);
}

// Экспорт задач
exports.default = series(
  format,
  parallel(html, styles, scripts, images, fonts),
  serve
);
