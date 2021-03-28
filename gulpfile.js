/* eslint no-undef: 0 */
const gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  uglify = require('gulp-uglify-es').default,
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create(),
  svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

//SERVE
//['html', 'css', 'fonts', 'javascript', 'images', 'svg', 'audio']
gulp.task('default', ['html', 'templates', 'css', 'fonts', 'javascript', 'images', 'svg', 'audio'], () => {
  browserSync.init({
    startPath: 'build',
    server: {
      baseDir: './'
    }
  });

  gulp.watch('dev/*.html', ['html']);
  gulp.watch('dev/**/*.pug', ['pug-watch']);
  gulp.watch('dev/styles/**/*.scss', ['css']);
  gulp.watch('dev/img/**/*.{png,jpg}', ['images']);
  gulp.watch('dev/img/**/*.{svg}', ['svg']);
  gulp.watch('dev/js/main.js', ['javascript']).on('change', browserSync.reload);
  gulp.watch('build/index.html').on('change', browserSync.reload);
});

gulp.task('templates', () => {
    return gulp.src('dev/templates/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('pug-watch', ['templates'], browserSync.reload);

//HTML
gulp.task('html', () => {
  return gulp.src('dev/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
});

//SASS
gulp.task('css', () => {
  gulp.src(['dev/styles/*.css', 'dev/styles/*.scss'])
    .pipe(sass({
      //outputStyle: 'compressed',
      sourceComments: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cssnano({
      zindex: false
    }))
    .pipe(gulp.dest('build/css/'))
    .pipe(browserSync.stream());
});

//FONTS
gulp.task('fonts', () => {
  gulp.src('dev/styles/fonts/*')
    .pipe(gulp.dest('build/css/fonts/'))
    .pipe(browserSync.stream());
});

//JAVASCRIPT
gulp.task('javascript', () => {
  gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

//IMAGES
gulp.task('images', () => {
  gulp.src('dev/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

//SVG

gulp.task('svg', () => {
  return gulp.src('dev/img/svg-sprite/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('[opacity]').removeAttr('opacity');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: 'sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('build/img/svg-sprite'));
});

//AUDIO
gulp.task('audio', () => {
  gulp.src('dev/audio/*')
    .pipe(gulp.dest('build/audio'));
});

//COMPRESS
gulp.task('compress', () => {
  //CSS
  gulp.src(['dev/styles/*.css', 'dev/styles/*.scss'])
    .pipe(sass({
      sourceComments: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(cssnano({
      zindex: false
    }))
    .pipe(gulp.dest('delivery/css/'));
  //FONTS
  gulp.task('fonts', () => {
    gulp.src('dev/styles/fonts/*')
      .pipe(gulp.dest('delivery/css/fonts/'))
      .pipe(browserSync.stream());
  });
  //Sass
  gulp.src('dev/styles/**/*.scss')
    .pipe(gulp.dest('delivery/sass/'));
  //Img
  gulp.src('dev/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('delivery/img'));
});
