var path = require('path');
var project = require('./package.json');
var node_modules = path.resolve(__dirname, 'node_modules');
var react = path.resolve(node_modules, 'react/dict/react.js');
var process = require('process');
var webpack = require('webpack');

var ENV = process.env.NODE_ENV;
var config = {
    entry:{
        'index':'./src/index.jsx'
    },
    output:{
        //publicPath:"./dist/",
        publicPath:ENV == 'development' ? "http://localhost:8008/dist/" : "./dist/",
        path:"./dist/",
        filename:'index.js',
        chunkFilename:'chunk/[name].[chunkhash:8].js'
    },
    externals: [
        {
            "jquery": "jQuery",
            "react": "React",
            "react-dom": "ReactDOM",
            "zepto": "Zepto"
        },
        require('webpack-require-http')
    ],
    module:{
        loaders:[
            {
                test:/\.(jsx)?$/,
                //exclude:/(node_modules|server)/,
                loader: 'babel',
                query:{
                    presets:['es2015', 'stage-0', 'react']
                }
            },
            {
                test:/\.(svg)?$/,
                loader:'svg-url-loader'
            },
            {
                test:/\.(json)?$/,
                loader: 'json'
            },
            {
                test:/\.(scss|sass)?$/,
                loader:'style!css!sass'
            },
            {
                test:/\.css?$/,
                loader:'style!css'
            },
            {
                test: /\.md$/,
                loader: "html!markdown"
            },
            {
                test:/\.(jpg|png|gif|jpeg)?$/,
                loader:'url'
            }
        ],
        noParse:[react]
    },
    plugins:[
        //防止压缩代码后redux报错
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
        })
    ]
};

module.exports = config;