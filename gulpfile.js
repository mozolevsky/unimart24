let gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	uglify = require("gulp-uglify"),
	rename = require("gulp-rename"),
	cssnano = require("gulp-cssnano"),
	del = require("del"),
	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant"),
	cache = require("gulp-cache"),
	autoprefixer = require("gulp-autoprefixer"),
	babel = require("gulp-babel"),
	gutil = require("gulp-util"),
	replace = require("gulp-replace"),
	sourcemaps = require("gulp-sourcemaps"),
	concat = require("gulp-concat"),
	wait = require("gulp-wait"),
	modifyCssUrls = require('gulp-modify-css-urls');


gulp.task("sass", function () {
	return gulp.src("app/sass/main.scss")
        .pipe(wait(1500))
        .pipe(sourcemaps.init())
        .pipe(sass({
		includePaths: [
			'app/sass/'
		    ]
	}))
	.pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
	.pipe(concat('main.css'))
	.pipe(sourcemaps.write(''))
	.pipe(gulp.dest("app/css"))
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task("stylesMove", ["sass", "cssMin"], function () {
	return gulp.src("app/css/*")
        .pipe(gulp.dest("dist/css"));
});

gulp.task("cssMin", function () {
	return gulp.src("app/css/main.css")
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("app/css"));
});

gulp.task("browser-sync", function () {
	browserSync({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task("es6", function () {
	return gulp.src("app/scripts/*")
        .pipe(babel({
	presets: ["es2015"]
}))
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task("scriptsMin", ["es6"], function () {
	return gulp.src("dist/scripts/*")
        .pipe(uglify())
        .on("error", function (err) { gutil.log(gutil.colors.red("[Error]"), err.toString()); })
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/scripts"));
});

gulp.task("clean", function () {
	return del.sync("dist");
});

gulp.task("clearCache", function () {
	return cache.clearAll();
});

gulp.task("img", function () {
	return gulp.src("app/img/**/*")
        .pipe(cache(imagemin({
	interlaced: true,
	progressive: true,
	svigoPlugins: [{ removeViewBox: false }],
	use: [pngquant()]
})))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("watch", ["sass", "browser-sync"], function () {
	gulp.watch("app/sass/**/**/*.scss", ["sass"]);
	gulp.watch("app/**/**/**/*.html", browserSync.reload);
	gulp.watch("app/scripts/**/*.js", browserSync.reload);
});

gulp.task("default", ["watch"]);

gulp.task("build", ["clean", "img", "stylesMove", "scriptsMin"], function () {

	let moveFonts = gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));

	let moveHtml = gulp.src("app/*.html")
        .pipe(replace("css/main.css", "css/main.min.css"))
        .pipe(replace("js/scripts.js", "js/scripts.min.js"))
        .pipe(gulp.dest("dist"));

	let movePhp = gulp.src("app/*.php")
        .pipe(gulp.dest("dist"));

	let moveVideo = gulp.src("app/video/*")
        .pipe(gulp.dest("dist/video"));

	let moveLibs = gulp.src("app/libs/**/*")
        .pipe(gulp.dest("dist/libs"));
});

gulp.task("easy-build", ["clean", "stylesMove", "scriptsMin"], function () {

	let modifyUrls = gulp.src("dist/css/main.min.css")
	.pipe(replace("../../../img", "../../img"))
        .pipe(replace("../../img", "../img"))
        .pipe(gulp.dest("dist/css"));

	let moveFonts = gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));

	let moveHtml = gulp.src("app/*.html")
        .pipe(replace("css/main.css", "css/main.min.css"))
        .pipe(replace("js/scripts.js", "js/scripts.min.js"))
        .pipe(gulp.dest("dist"));

	let movePhp = gulp.src("app/*.php")
        .pipe(gulp.dest("dist"));

	let moveVideo = gulp.src("app/video/*")
        .pipe(gulp.dest("dist/video"));

	let moveLibs = gulp.src("app/libs/**/*")
	.pipe(gulp.dest("dist/libs"));
	
	let moveImgs = gulp.src("app/img/**/*")
	.pipe(gulp.dest("dist/img"));
});