
module.exports = {
  entry: './build/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: './build/'
  },
  node: {
    fs: "empty"
  },
  bail: true,
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.json$/, use: 'json-loader' },
      { test: /\.html$/, use: 'file-loader' },
      // jquery-ui loads some images
      { test: /\.(jpg|png|gif)$/, use: 'file-loader' },
      // required to load font-awesome
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.js.map$/, use: 'file-loader' },
    ],
  }
}
