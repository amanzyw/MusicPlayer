var path=require("path");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
var fs=require("fs");
var rucksack=require('rucksack-css');
var autoprefixer=require('autoprefixer');

const pkgPath = path.join(__dirname, 'package.json');
const pkg = fs.existsSync(pkgPath) ? require(pkgPath) : {};
let theme = {};
  if (pkg.theme && typeof(pkg.theme) === 'string') {
    let cfgPath = pkg.theme;
    // relative path
    if (cfgPath.charAt(0) === '.') {
      cfgPath = resolve(__dirname, cfgPath);
    }
    const getThemeConfig = require(cfgPath);
    theme = getThemeConfig();
} else if (pkg.theme && typeof(pkg.theme) === 'object') {
    theme = pkg.theme;
}


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
                loader: ExtractTextPlugin.extract(
                    'css?sourceMap&modules&localIdentName=[local]___[hash:base64:5]!!' +
                    'postcss!' +
                    `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
                ),
            }
        ]
    },
    postcss: [
      rucksack(),
      autoprefixer({
        browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      }),
    ]
}