const { src, dest, series, watch } = require('gulp');
const htmlMin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const image = require('gulp-image');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist'])
}

const resources = () => {
  return src('app/resources/**')
      .pipe(dest('dist'))
}

const styles = () => {
  return src('app/styles/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleancss({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src ('app/**/*.html')
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
  return src('app/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('dist/img/'))
}

const images = () => {
  return src([
    'app/img/**/*.jpg',
    'app/img/**/*.png',
    'app/img/*.svg',
    'app/img/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/img/'))
}

const scripts = () => {
  return src([
    'app/js/**.js'
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(concat('app.min.js'))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js/'))
  .pipe(browserSync.stream())
}

const copyScripts = () => {
  return src('src/js/libs/**/*.js')
  .pipe(dest('dist/js/'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('app/**/*.html', htmlMinify);
watch('app/styles/**/*.scss', styles);
watch('app/img/svg/**/*.svg', svgSprites);
watch(['app/img', '!app/img/svg/**/*.svg'], images);
watch('app/js/*.js', scripts);
watch('app/js/libs/**/*.js', copyScripts);

exports.clean = clean;
exports.styles = styles;
exports.resources = resources;
exports.htmlMinify = htmlMinify;
exports.svgSprites = svgSprites

exports.dev = series(resources, htmlMinify, styles, images, svgSprites, scripts, copyScripts, watchFiles);
exports.default = series(clean, resources, htmlMinify, styles, images, svgSprites, scripts, copyScripts);
