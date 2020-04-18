const gulp = require("gulp");
const babel = require("gulp-babel");
const minify = require("gulp-babel-minify");
const concat = require("gulp-concat");
const order = require("gulp-order");
const cleanCSS = require("gulp-clean-css");
const pipeline = require("readable-stream").pipeline;
const path = require("path");

const resources = path.resolve(__dirname, "src", "resources");
const assets = path.resolve(__dirname, "public", "assets");

function MinfyCss() {
  return pipeline(
    gulp.src(`${resources}/css/*.css`),
    cleanCSS(),
    concat("styles.css"),
    gulp.dest(`${assets}/css`)
  );
}

function MinifyJs() {
  return pipeline(
    gulp.src(`${resources}/js/*.js`),
    order(["globals.js", "functions.js", "events.js"]),
    babel({
      presets: ["@babel/env"],
    }),
    minify({
      mangle: {
        keepClassName: true,
      },
    }),
    concat("app.js"),
    gulp.dest(`${assets}/js`)
  );
}

gulp.task("bundle", () => {
  gulp.watch(`${resources}/**`, gulp.series(MinfyCss, MinifyJs));
});
