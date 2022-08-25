const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const gulpZIP = require('gulp-zip');
const babelJS = require('gulp-babel');
const beautify = require('gulp-beautify');
const terserJS = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const deleteAsync = require('del');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// Variables setting
const _rootName = path.basename(__dirname);
const _tempName = '.temp';
const _buildName = 'dist';
const _sourceName = 'app';
const _modeIsDev = !process.argv.includes('--production');
const _modeIsProd = process.argv.includes('--production');

// Processing Bundle SCSS
function collectSCSS() {
  return gulp
    .src([`./${_sourceName}/scss/**/*.scss`], { sourcemaps: _modeIsDev })
    .pipe(sass().on('error', sass.logError))
    .pipe(beautify.css({ indent_size: 4 }))
    .pipe(autoprefixer({ grid: 'autoplace', cascade: true }))
    .pipe(gulp.dest(`./${_sourceName}/css/`))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`./${_sourceName}/css/`, { sourcemaps: './' }))
    .pipe(browserSync.stream());
}

// Processing Bundle JS
function collectJS() {
  return gulp
    .src([`./${_sourceName}/js/**/*.js`, `!./${_sourceName}/js/**/*.min.js`], { sourcemaps: _modeIsDev })
    .pipe(babelJS({ presets: ['@babel/env'] }))
    .pipe(beautify.js({ indent_size: 2 }))
    .pipe(gulp.dest(`./${_tempName}/js/`))
    .pipe(terserJS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`./${_sourceName}/js/`, { sourcemaps: './' }))
    .pipe(browserSync.stream());
}

// Processing build project
function collectBuild() {
  return gulp
    .src(
      [
        `./${_sourceName}/**/*.html`,
        `./${_sourceName}/js/**/*.min.js`,
        `./${_sourceName}/css/**/*.css`,
        `./${_sourceName}/fonts/**/*.*`,
        `./${_sourceName}/images/**/*.*`,
        `./${_sourceName}/site.webmanifest`,
        `./${_sourceName}/favicon.ico`,
        `./${_sourceName}/{favicon*,android*,apple*}.png`,
      ],
      { base: `./${_sourceName}/` },
    )
    .pipe(gulp.dest(`./${_buildName}/`))
    .pipe(gulp.src(`./${_tempName}/{js,css}/**/*.*`, { base: `./${_tempName}/` }))
    .pipe(gulp.dest(`./${_buildName}/`));
}

// Processing archiving build
function collectArchive() {
  return gulp
    .src(`./${_buildName}/**/*.*`)
    .pipe(gulpZIP(`${_rootName}.zip`))
    .pipe(gulp.dest('./'));
}

// Starting a server with file watching
function runServer() {
  browserSync.init({
    server: {
      baseDir: `./${_sourceName}/`,
    },
    port: 1234,
    open: true,
    online: true,
    notify: false,
  });

  gulp.watch([`./${_sourceName}/**/*.html`]).on('change', browserSync.reload);
  gulp.watch([`./${_sourceName}/js/**/*.js`, `!./${_sourceName}/js/**/*.min.js`], collectJS);
  gulp.watch([`./${_sourceName}/scss/**/*.scss`], collectSCSS);
}

// Clean command
const cleanTemp = () => deleteAsync([`./${_tempName}/**/*`]);
const cleanBuild = () => deleteAsync([`./${_buildName}/**/*`]);
const cleanArchive = () => deleteAsync([`./${_rootName}.zip`]);

// Base tasks
exports.clean = gulp.series(cleanTemp, cleanBuild, cleanArchive);
exports.build = gulp.series(cleanTemp, cleanBuild, collectJS, collectSCSS, collectBuild);
exports.archive = gulp.series(
  cleanTemp,
  cleanBuild,
  collectJS,
  collectSCSS,
  collectBuild,
  cleanArchive,
  collectArchive,
);

// Default task
exports.default = gulp.series(collectJS, collectSCSS, runServer);
