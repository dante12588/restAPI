const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

function js(){
    return gulp.src('./src/**/*.ts')
    .pipe(babel({
        presets: ["@babel/preset-typescript"]
    }))
    .pipe(gulp.dest('dist'));
}

function views(){
    return gulp.src('./src/**/*.pug')
    .pipe(gulp.dest('dist'));
}

function public(){
    return gulp.src('./src/public/**/*.*')
    .pipe(gulp.dest('dist/public'));
}

function del(){
    return gulp.src('./dist/*', {read: false})
    .pipe(clean());
}

// exports.js = js;
// exports.views = views;
// exports.public = public;
// exports.del = del;



gulp.task('build' ,gulp.series(del, views ,js, public));