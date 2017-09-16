var path=require("path");

module.exports={
    entry:{
        app:"./src/app/main.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"[name].bundle.js",
        publicPath:"/assets/"
    },
    devServer: {
        contentBase: './dist'
    },
    module:{
        rules:[
            {
                test:/\.png|.jpg$/,
                loader:"url-loader"
            },
            {
                test:/\.jsx?$/,
                exclude:path.resolve(__dirname,"node_modules"),
                loader:"babel-loader",
                options:{
                    presets:["es2015","react"]
                }
            },{
                test:/\.css$/,
                exclude:path.resolve(__dirname,"node_modules"),
                loader:"style-loader!css-loader"
            },
            {
                test: /\.less$/,
                loader:["style-loader","css-loader","less-loader"]
            }
        ]
    }
}