const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports={
  entry:'./src/index.js',
  output:{
    filename:'main.js'
  },
  module:{
    rules:[{
      test:/\.less$/,
      use: [{
        loader: "style-loader" 
        },{
            loader: "css-loader" 
        },{
            loader: "less-loader"
        }]
        }]
  },
  devtool:process.env.NODE_ENV==='production'?false:'inline-source-map',
  devServer:{
    contentBase:'./dist',
    stats:'errors-only',
  },
  plugins:[
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns:['./dist']
    }),
    new HtmlWebpackPlugin({
      template:'src/template/h5_header.html'
    })
  ]
}