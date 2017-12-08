var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var gutil = require("gulp-util");
var watchify = require("watchify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var paths = {
	pages: ["index.html"]
};

gulp.task("copyHtml", function(){
	return gulp.src(paths.pages)
		.pipe(gulp.dest("dist"));
});

gulp.task("default", ["copyHtml"], function () {
	return browserify({
		basedir: '.',
		debug: true,
		entries: ["src/main.ts"],
		cache: {},
		packageCache: {}
	})
	.plugin(tsify)
	.transform("babelify", {
		presets: ["env"],
		extensions: [".ts"]
	})
	.bundle()
	.pipe(source("bundle.js"))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sourcemaps.write("./"))
	.pipe(gulp.dest("dist"));
});


/*var watchedBrowserify = watchify(
		browserify({
			basedir: '.',
			debug: true,
			entries: ["src/main.ts"],
			cashe: {},
			packageCache: {}
		}).plugin(tsify)
	);



 
 function bundle() {
 	return watchedBrowserify
 		.bundle()
 		.pipe(source("bundle.js"))
 		.pipe(gulp.dest("dist"));
 }

gulp.task("default", ["copyHtml"], bundle);
watchedBrowserify.on("update", bundle);
watchedBrowserify.on("log", gutil.log);
*/