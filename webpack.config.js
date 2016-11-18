module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css',
                    'postcss'
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loaders: [
                    'url'
                ],
                query: {
                    limit: 8192
                }
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};
