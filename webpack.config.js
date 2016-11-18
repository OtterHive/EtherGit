module.exports = {
    entry: './index.js',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: './index.js',
                exclude: 'node_modules',
                query: {
                    presets: [
                        'latest',
                        'react'
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
};
