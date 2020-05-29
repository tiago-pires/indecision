// entry -> output
// entry -> loaders -> output
// entry -> loaders -> plugins -> output

const path = require('path')

module.exports = {
    entry: './src/app.js', // '.' means here
    output: {
        path: path.join(__dirname,'public','scripts'), // absolute path to output, you can use __dirname instead of '.'
        filename: 'app.js'
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
            }
          }
        ]    
    }
}