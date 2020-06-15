const { task, src, dest, parallel, watch, series } = require("gulp");
const rm = require("gulp-rm");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const px2rem = require("gulp-px2rem");
const cleanCSS = require("gulp-clean-css");
const gcmq = require("gulp-group-css-media-queries");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const env = process.env.NODE_ENV;
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;

sass.compiler = require("node-sass");

task("clean", () => {
  return src("dist/**/*", { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(reload({ stream: true }));
});

task("copy:fonts", () => {
  return src("src/fonts/*").pipe(dest("dist/fonts"));
});

task("copy:img", () => {
  return src("src/img/**/*")
    .pipe(dest("dist/img"))
    .pipe(reload({ stream: true }));
});

const styles = [
  "node_modules/normalize.css/normalize.css",
  "src/css/**/*.scss",
];

task("styles", () => {
  return src(styles)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(px2rem())
    .pipe(gulpif(env === "prod", gcmq()))
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "prod", autoprefixer()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist/css"))
    .pipe(reload({ stream: true }));
});

const scripts = ["node_modules/jquery/dist/jquery.min.js", "src/js/*.js"];

task("scripts", () => {
  return src(scripts)
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.js"))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest("dist/js"))
    .pipe(reload({ stream: true }));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
});

task("watch", () => {
  watch("./src/*.html", series("copy:html"));
  watch("./src/img/**/*", series("copy:img"));
  watch("./src/css/**/*", series("styles"));
  watch("./src/js/*", series("scripts"));
});

task(
  "default",
  series(
    "clean",
    parallel("copy:html", "copy:img", "copy:fonts", "styles", "scripts"),
    parallel("watch", "server")
  )
);

task(
  "prod",
  series(
    "clean",
    parallel("copy:html", "copy:img", "copy:fonts", "styles", "scripts"),
    "server"
  )
);
