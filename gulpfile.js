var gulp =      require('gulp'),
    jade =      require('gulp-jade'),
    sass =      require('gulp-sass'),
    uglify =    require('gulp-uglify'),
    watch =     require('gulp-watch'),
    webserver = require('gulp-webserver'),
    bulkSass =  require('gulp-cssimport'),
    paths = {
                jade: ['public/app/**/*.jade'],
                sass: ['public/styles/main.sass'],
                scripts: ['public/app/**/*.js']
    };


gulp.task('jade', function() {
    return gulp.src(paths.jade)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/production/html'))
});

gulp.task('jadeIndex', function() {
    return gulp.src('./*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(bulkSass())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('./public/styles'))
});

gulp.task('compress', function() {
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(gulp.dest('./public/production/minifiedJS'));
});


gulp.task('webserver', function() {
    gulp.src('./')
    .pipe(webserver({
        livereload: true,
        open: true,
        port: 1337,
        fallback: 'index.html'
    }));
});

gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch('index.jade', ['jadeIndex']);
    gulp.watch('./public/styles/modules/**/*.sass', ['sass']);
    gulp.watch(paths.scripts, ['compress']);
    console.log('Watching')
});


gulp.task('default', ['jade', 'jadeIndex', 'sass', 'compress', 'watch', 'webserver']);
