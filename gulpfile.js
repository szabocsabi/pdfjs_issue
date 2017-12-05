const gulp = require("gulp");
const path = require("path");

const typescript = require("gulp-typescript");
const del = require("del");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync");
const newer = require("gulp-newer");
const spawn = require("cross-spawn").spawn;
const header = require("gulp-header");
const svgstore = require("gulp-svgstore");
const svgmin = require("gulp-svgmin");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");

const package = require("./package.json");
const rootPath = process.cwd();

const config = {
  src: path.resolve(rootPath, "src/"),
  build: path.resolve(rootPath, "build/"),
  release: path.resolve(rootPath, "release/"),
  nodeModules: path.resolve(rootPath, "node_modules/"),
  sassOptions: {
    outputStyle: "expanded",
    sourcemap: true
  },
  autoprefixerOptions: {
    browsers: ["last 2 version", "> 5%"]
  },
  tsConfig: path.resolve(rootPath, "tsconfig.json"),
  banner:
    '/*!\n * <%= file.relative %> (Generated: <%= new Date().toISOString().split("T")[0] %>)\n * <%= pkg.name %> v<%= pkg.version %>\n * <%= pkg.homepage %>\n * Copyright (c) Oracle\n*/\n\n'
};

function clean(path) {
  return del([path], { force: true });
}

function cleanBuild() {
  return clean(path.resolve(config.build, "**/*"));
}

function html() {
  return gulp.src(path.resolve(config.src, "**/*.html"))
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.stream({
      once: true
    }));
}

function pdf(dest) {
  return gulp.src(path.resolve(config.src, "**/*.pdf"))
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.stream({
      once: true
    }));
}

function tsc() {
  return gulp
    .src(path.resolve(config.src, "**/*.ts"))
    .pipe(newer({
      dest: config.build,
      ext: ".js"
    }))
    .pipe(typescript(require(config.tsConfig).compilerOptions)).js
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.stream({
      once: true
    }));
}

function scss() {
  return gulp
    .src(path.resolve(config.src, "**/*.scss"))
    .pipe(
    newer({
      dest: config.build,
      ext: ".css"
    })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: [
      ],
      sourcemap: true
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer(config.autoprefixerOptions))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.build))
    .pipe(browserSync.stream());
}

function startBrowserSync(baseDir, routes) {
  /*
   var proxyOptions = url.parse('http://slc12axc.us.oracle.com:8203/cloudstore-service/resources/');
   proxyOptions.route = '/oalapp/cloud/store/web/';
   */
  browserSync.init({
    injectChanges: true,
    ui: false,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: baseDir,
      routes: routes
    }
  });
}

function watch() {
  startBrowserSync(config.build, {
    "/libs/": config.nodeModules
  });

  gulp.watch(path.resolve(config.src, "**/*.html"), html);
  gulp.watch(path.resolve(config.src, "**/*.ts"), tsc);
  gulp.watch(path.resolve(config.src, "**/*.scss"), scss);
}

const build = gulp.series(cleanBuild, gulp.parallel(html, tsc, scss, pdf));

gulp.task("default", gulp.series(build, watch));
