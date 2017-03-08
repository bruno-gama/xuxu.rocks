var path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /\.scss$/,
            loader: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractSass
    ]
};