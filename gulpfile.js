const { series, parallel, watch, src, dest } = require('gulp');
const sass = require("gulp-sass"),
    gulpif = require('gulp-if'),
    browserSync = require('browser-sync').create(),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include'),
    imagemin = require('gulp-imagemin'),
    buffer = require('vinyl-buffer'),
    merge = require('merge-stream'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify');
    spritesmith = require('gulp.spritesmith');


const scssFiles = ['src/styles/**/*.scss', 'src/styles/**/*.scss'];
const htmlFiles = ['src/pages/**/*.html'];
const templatesFiles = ["./src/templates/**/*.html"];
const spriteFiles = ["src/sprite/*.png"];
const imageFiles = ["src/img/**/*"];
const javascriptFiles = ["src/js/**/*.js"];

function isLive() {
  return process.env.NODE_ENV === 'live';
}

function html() {
    return src(htmlFiles)
        .pipe(
            fileinclude({
                prefix: '@@',
                // basepath: '@file',
                basepath: './src',
                context: {
                    staticUrl: process.env.STATIC_URL || '/assets',
                    title: 'Default page title',
                },
            })
        )
        .pipe(
            gulpif(isLive, htmlmin({ collapseWhitespace: true }))
        )
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream());
}

function scss() {
  return src(scssFiles, { sourcemaps: !isLive() })
    .pipe(
        sass().on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(
        gulpif(isLive, cleanCSS())
    )
    .pipe(dest('dist/assets/css/', { sourcemaps: !isLive() }))
    .pipe(browserSync.stream());
}

function sprite() {
    const spriteData = src(spriteFiles)
        .pipe(
            spritesmith({
                imgPath: `${process.env.STATIC_URL || '/assets'}/img/sprite.png`,
                retinaImgPath: `${process.env.STATIC_URL || '/assets'}/img/sprite@2x.png`,
                imgName: 'sprite.png',
                cssName: '_icon-mixin.scss',
                retinaImgName: 'sprite@2x.png',
                retinaSrcFilter: ['./src/sprite/*@2x.png'],
                cssVarMap: function(sprite) {
                    sprite.name = 'icon-' + sprite.name;
                }
            })
        );

    const imgStream = spriteData.img
        .pipe(
            gulpif(isLive, buffer())
        )
        .pipe(
            gulpif(isLive, imagemin())
        )
        .pipe(dest('./dist/assets/img/'))
        .pipe(browserSync.stream());

    const cssStream = spriteData.css
        .pipe(dest('./src/styles/'));

    return merge(imgStream, cssStream)
}

function image() {
    return src(imageFiles)
        .pipe(
            gulpif(isLive, imagemin())
        )
        .pipe(dest('./dist/assets/img/'))
        .pipe(browserSync.stream());
}

function javascript() {
    return src(javascriptFiles)
        .pipe(
            gulpif(isLive, uglify())
        )
        .pipe(dest('./dist/assets/js/'))
        .pipe(browserSync.stream());
}

function clean() {
    return del('./dist')
}

function serve() {
  browserSync.init({
      server: { baseDir: "./dist" },
      port: "3000"
  });

  watch(scssFiles, scss);
  watch(htmlFiles, html);
  watch(templatesFiles, html);
  watch(spriteFiles, sprite);
  watch(imageFiles, image);
  watch(javascriptFiles, javascript);
}

const build = series(
    clean,
    parallel(
        series(sprite, scss),
        html,
        image,
        javascript,
    )
);

exports.clean = clean;
exports.sprite = sprite;
exports.scss = scss;
exports.build = build;
exports.default = series(build, serve);
