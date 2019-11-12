module.exports = {
  src: {
    css: "./src/sass/*.sass",
    html: "./src/*.pug",
    js: "./src/js/*.js",
    icons: "./src/assets/svg/*.svg"
  },
  dest: {
    css: "./css",
    maps: "./maps",
    html: "./",
    js: "./js",
    icons: "./assets/icons"
  },
  watch: {
    css: "./src/sass/**/*.sass",
    html: "./src/**/*.pug",
    js: "./src/js/**/*.js"
  }
};
