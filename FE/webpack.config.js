module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    hot: true, // Enable hot module replacement
    liveReload: true,
    watchFiles: ['src/**/*'], // Watch these files for changes
    client: {
      overlay: true, // Show errors in browser overlay
      progress: true, // Show compilation progress
    },
  },
};
