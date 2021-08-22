const path = require('path');
const MiniExtractCssPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = 'development'

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports =  {
    mode,
    target: "web",
    devtool: 'source-map',
    entry: { index: path.resolve(__dirname, "src", "index.ts") },
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: () => mode === 'development'
                        ? '[path][name].[ext]'
                        :  '[hash].[ext]',
                    outputPath: 'images',
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.s?css$/i,
                use: [
                    {
                        loader: MiniExtractCssPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    "postcss-loader"]
            }
        ]
    },
    devServer: {
        port: 9000,
        static: 'src',
        hot: true,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    resolve: {
        extensions: [".js", ".json", ".ts", ".tsx"],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniExtractCssPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ]
}