const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// Compile SCSS into CSS
function style() {
    return (
        gulp
            // Where is my SCSS file?
            .src("./resources/scss/**/*.scss")
            // Pass that file through the compiler.
            .pipe(sass().on("error", sass.logError))
            // Where do I save the compiled CSS?
            .pipe(gulp.dest("./resources/css"))
            // stream changes to all browsers.
            .pipe(browserSync.stream())
    );
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./",
        },
    });

    gulp.watch("./resources/scss/**/*.scss", style);
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("./resources/js/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;
