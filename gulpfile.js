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

gulp.task("default",function(){
    return runSequence('clean',['jshint','uglify','htmlmin','cssmin','copy']);
});

