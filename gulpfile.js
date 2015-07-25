var gulp = require('gulp'),
    webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    gulp.src('public/app')
    .pipe(webserver({
        fallback: 'index.html',
        directoryListing: true,
        livereload: true,
        open: true,
        port: 5757

    }));
});
