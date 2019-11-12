const mode =
  process.env.NODE_ENV == "development" ? "development" : "production";

module.exports = {
  watch: true,
  module: {
    rules: []
  },
  output: {
    filename: "[name].min.js"
  },
  devtool: "source-map",
  mode
};
