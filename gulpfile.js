const { src, dest, watch, series, parallel } = require("gulp");
const sass = require("gulp-sass");
const server = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const plugins = require("./plugins");
const named = require("vinyl-named");
const webpack = require("webpack-stream");
const log = require("fancy-log");
const critical = require("critical").stream;
const iconfont = require("gulp-iconfont");
const runTimestamp = Math.round(Date.now() / 1000);
const fontIconSettings = {
  fontName: "shahramFont", // required
  prependUnicode: true, // recommended option
  formats: ["ttf", "eot", "woff"], // default, 'woff2' and 'svg' are available
  timestamp: runTimestamp
};

const { src: srcPath, watch: watchPath, dest: destPath } = require("./paths");

const isProduction = process.env.NODE_ENV === "production";

//Views
function html() {
  return src(srcPath.html)
    .pipe(pug({ pretty: true }))
    .pipe(dest(destPath.html))
    .pipe(server.stream());
}

//CSS Styles
function styles() {
  return src(srcPath.css)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss(plugins.postcss))
    .pipe(sourcemaps.write(destPath.maps))
    .pipe(dest(destPath.css))
    .pipe(server.stream());
}

//Javascript
function js() {
  return src(srcPath.js, { sourcemaps: !isProduction })
    .pipe(named())
    .pipe(webpack({ config: require("./webpack.config.js") }))
    .pipe(dest(destPath.js, { sourcemaps: !isProduction }))
    .pipe(server.stream());
}

// Server configs and Serving files
function serve() {
  server.init({
    server: {
      baseDir: "./"
    },
    port: 3000,
    open: true
  });
  //Watch files
  watch(watchPath.css, styles);
  watch(watchPath.js, js);
  watch(watchPath.html, html);
  watch("./*.html", server.reload);
}

//Generate webfont from SVG icons
function generateIcons() {
  return src(srcPath.icons)
    .pipe(iconfont(fontIconSettings))
    .on("glyphs", function(glyphs, options) {
      // CSS templating, e.g.
      console.log(glyphs, options);
    })
    .pipe(dest(destPath.icons));
}

function criticalCss() {
  return src("./*.html")
    .pipe(
      critical({
        base: "./",
        inline: true,
        css: ["./css/main.min.css", "./css/main.min.css"],
        width: 1300,
        height: 900
      })
    )
    .on("error", err => {
      log.error(err.message);
    })
    .pipe(dest("dist"));
}

exports.css = styles;
exports.html = html;
exports.js = js;
exports.default = parallel(styles, html, js, serve);
exports.build = parallel(styles, html, js);
exports.icons = generateIcons;
exports.critical = criticalCss;
