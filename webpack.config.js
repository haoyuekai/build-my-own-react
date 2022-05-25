module.exports = {
    mode: 'development',
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "index.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,//Include all modules that pass test assertion.
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    }
};