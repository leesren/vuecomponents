var path = require("path"),
  webpack = require("webpack");

console.log(process.argv);
var prod = process.argv[3] && process.argv[3] == "prod";
var plugins = [];
if (prod) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}
module.exports = {
  entry: {
    closepan: "./src/closepan.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].min.js",
    libraryTarget: "umd"
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue"
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  plugins: plugins
};
