const mode =
  process.env.NODE_ENV == "development" ? "development" : "production";

module.exports = {
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  output: {
    filename: "[name].min.js"
  },
  devtool: "source-map",
  mode
};
