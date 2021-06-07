// const path = require(`path`);

module.exports = {
  webpack: {
    configure: {
      resolve: {
        alias: {
          "mapbox-gl": "maplibre-gl",
        },
      },
    },
  },
};
