module.exports = function(config) {
  var _watcher = config.live && config.live === true;
  var _browser = config.browser || "PhantomJS";
  
  config.set({
    browsers: [_browser],
    files: [
      { pattern: 'tests.webpack.js', watched: false },
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: ['spec'],
    singleRun: !_watcher,
    autoWatch: _watcher,
    webpack: {
      module: {
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
          { test: /\.scss$/, loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]}
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
  });
};