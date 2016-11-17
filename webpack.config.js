module.exports = {
    entry: './index.js',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loaders: [
                    'babel'
                ],
                include: './index.js',
                query: {
                    presets: [
                        'es2015'
                    ]
                }
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
            }
        ]
    }
}
