var gulp = require("gulp");
var less = require("gulp-less");
var inject = require("gulp-inject");
var browserSync = require("browser-sync").create();
var del = require("del");

gulp.task("less", function () {
  return gulp.src("./src/**/*.less")
    .pipe(less())
    .pipe(gulp.dest("./build/css"));
});

gulp.task("html", ["less"], function () {
  var target = gulp.src("./src/index.html");
  var sources = gulp.src(["./build/**/*.css"], { read: false });
 
  return target.pipe(inject(sources, { ignorePath: "/build" }))
    .pipe(gulp.dest("./build"));
});

gulp.task("serve", ["html"], function () {
    browserSync.init({ server: "./build" });
    gulp.watch("./src/**/*", ["html"]);
    gulp.watch("build/**/*").on("change", browserSync.reload);
});

gulp.task("clean", function (cb) {
  del(["./build"], cb);
});

gulp.task("default", ["watch"]);