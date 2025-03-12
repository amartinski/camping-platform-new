const webpack = require("webpack");

module.exports = {
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer"),
      "querystring": require.resolve("querystring-es3"),
      "util": require.resolve("util"),
      "url": require.resolve("url"),
      "fs": false,  // fs não é suportado no frontend
      "net": false, // net não é suportado no frontend
      "zlib": false // zlib não é necessário no frontend
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
