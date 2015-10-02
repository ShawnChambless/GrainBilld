var gulp            = require('gulp'),
    jade            = require('gulp-jade'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify'),
    watch           = require('gulp-watch'),
    webserver       = require('gulp-webserver'),
    bulkSass        = require('gulp-cssimport'),
    plumber         = require('gulp-plumber'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    annotate        = require('gulp-ng-annotate'),
    uglifyCss       = require('gulp-uglifycss'),
    paths = {
                jade: ['public/app/**/*.jade'],
                sass: ['public/styles/main.sass'],
                scripts: ['public/app/**/*.js']
    };

gulp.task('concat', function(done) {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(annotate())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/production/'))
        .on('end', done);
});

gulp.task('jade', function() {
    return gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/app'));
});

gulp.task('jadeIndex', function() {
    return gulp.src('./public/index.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(bulkSass())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(uglifyCss({
            expandVars: true,
            uglyComments: true
        }))
        .pipe(gulp.dest('./public/styles'));
});

// gulp.task('compress', function() {
//     return gulp.src(paths.scripts)
//         .pipe(plumber())
//         .pipe(uglify())
//         .pipe(gulp.dest('./public/production/minifiedJS'));
// });


// gulp.task('webserver', function() {
//     gulp.src('./public')
//     .pipe(webserver({
//         livereload: true,
//         open: false,
//         port: 1337,
//         fallback: 'index.html'
//     }));
// });

gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch('./public/index.jade', ['jadeIndex']);
    gulp.watch(['./public/styles/modules/**/*.sass','./public/styles/modules/**/*.scss' ], ['sass']);
    gulp.watch(paths.scripts, ['concat']);
    console.log('Watching');
});


gulp.task('default', ['jade', 'jadeIndex', 'sass', 'concat', 'watch']);
