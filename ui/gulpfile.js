const gulp = require('gulp');
const browserify = require('browserify');
const babelify= require('babelify');
const source = require('vinyl-source-stream');
const Server = require('karma').Server;
const sass = require('gulp-sass');


gulp.task('bundle', () => {
    return browserify('./src/js/bundle-node-modules.js', {debug: true})
        .bundle()
        .pipe(source('bundle-node-modules.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('babel', () => {
    return browserify('./src/js/main.js', {debug: true})
        .transform(babelify, { presets: ["es2015"] })
        .bundle()
        .on("error", (err) => {
            console.log("Error on babel task: " + err.message);
            this.emit("end");
        })
        .pipe(source('main.js'))
        .pipe(gulp.dest('./build'));
});


gulp.task('css', () => {
    return gulp.src('./src/css/**/*.scss')
        .pipe(sass())
        .on('error', (err) => {
            console.log(err.message);
        })
        .pipe(gulp.dest('./build/'))
});


gulp.task('test', (done) => {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


gulp.task('watch', () => {
    gulp.watch(
        ["./src/**/*.scss"],
        {interval: 500},
        ['css']
    );
    gulp.watch(
        ["./src/**/*.js"],
        {interval: 500},
        ['babel']
    );
    gulp.watch(
        ["./src/js/bundle-node-modules.js"],
        {interval: 500},
        ['bundle']
    );
});


gulp.task('build', ['bundle', 'babel', 'css']);
gulp.task('default', ['build', 'test']);
