const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.IgnorePlugin({ resourceRegExp: /^react-native-fs$/ })
    );

    return config;
}
