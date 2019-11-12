module.exports = {
  postcss: [
    require("autoprefixer")({
      cascade: false,
      grid: true
    }),
    require("cssnano")(),
    require("postcss-font-magician")({
      variants: {
        "Roboto Condensed": {
          "300": [],
          "400": [],
          "700": []
        }
      },
      foundries: ["google"]
    }),
    require("lost")
  ],
  webpack: []
};
