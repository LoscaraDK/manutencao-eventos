var gulp = require("gulp");
var jshint = require("gulp-jshint");
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var es = require('event-stream');
var htmlmin = require('gulp-htmlmin');
var cleancss = require('gulp-cleancss');
var runSequence = require("run-sequence");
var rename = require("gulp-rename");
var nodemon = require('gulp-nodemon');
var spawn   = require('child_process');
var bunyan   = require('bunyan');
var bs = require('browser-sync');



gulp.task("clean",function(){
    return gulp.src("dist/")
            .pipe(clean());
});

gulp.task("jshint",function(){
    return gulp.src("js/**/*.js")
            .pipe(jshint())
            .pipe(jshint.reporter("default"));
});

gulp.task("uglify",["clean"],function(){
    return es.merge([
            gulp.src(["node_modules/angular/angular.min.js",
                      "node_modules/angular-messages/angular-messages.min.js"]),
            gulp.src(["lib/**/*.js",
                      "js/**/*.js"]).pipe(concat("scripts.js")).pipe(uglify())
            ])
            .pipe(concat("scripts.min.js"))
            .pipe(gulp.dest("dist/js"));
});

gulp.task("htmlmin",function(){
    return gulp.src("view/**/*.html")
            .pipe(htmlmin({collapseWhitespace:true}))
            .pipe(gulp.dest("dist/view"));
});

gulp.task("cssmin",function(){
    return gulp.src(["css/**/*.css"])
            .pipe(cleancss())
            .pipe(concat("styles.min.css"))
            .pipe(gulp.dest("dist/css"));
});
//Exemplo de uso da copia
gulp.task("copy",function(){
    return gulp.src("view/prototipo.html")
            .pipe(rename("prototype.html"))
            .pipe(gulp.dest("dist/"));
});

gulp.task('run',['browser-sync'],function(cb) {
    var called = false; 
    var stream = nodemon({
        script: 'manutencao-eventos.js',
        ext:    'js html css',
        ignore: [
            'node_modules/',
            'gulpfile.js'
        ],
        watch:    ['js/','lib/','view/','css/','partials/'],
        stdout:   true,
        readable: true
    });
    stream.on('readable', function() {
 
        // free memory 
        bunyan && bunyan.kill();
 
        bunyan = spawn('./node_modules/bunyan/bin/bunyan', [
            '--output', 'short',
            '--color'
        ]);
 
        bunyan.stdout.pipe(process.stdout);
        bunyan.stderr.pipe(process.stderr);
 
        this.stdout.pipe(bunyan.stdin);
        this.stderr.pipe(bunyan.stdin);
    });
   
    stream.on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    })
    .on('restart',['default'], function () {
            console.log('restarted!!!');
            var reload = bs.reload;
            setTimeout(function () {
                reload({ stream: false });
            }, 1000);
      })
      .on('crash', function() {
        console.error('Application has crashed!\n');
         stream.emit('restart', 10); // restart the server in 10 seconds 
      });

      return stream;
});

gulp.task('browser-sync',function() {
    return bs({
        proxy: 'http://localhost:3000/manutencao-eventos',
        port: 3000,
        browser: ["firefox"],
        notify: true
        
    });
});

gulp.task("default",function(){
    return runSequence('clean',['jshint','uglify','htmlmin','cssmin','copy']);
});

