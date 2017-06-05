var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  // 程序的入口，String/Array/Object/Function
  entry: {
    app: './src/main.js'
  },

  // 解析和加载的初始路径,默认使用当前文件路径
  // content: __dirname,

  // 最终输出文件及目录
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  // 用于设置引用外部的环境进行模块构建，有利于程序优化 
  // (既然我们是模块化开发，当然要杜绝一切全局变量了，我们要用require的方式)
  // PS: externals配置的外部变量对象一般为某一个插件提供的对象
  // eg: jquery:$/jQuery , swiper:Swiper , angular:Angular
  externals: {
    jquery: 'jQuery'
  },

  resolve: {
    // 默认解析扩展路径，设置完成后再引入文件后可以节约后缀名
    extensions: ['', '.js', '.vue', '.json'],

    fallback: [path.join(__dirname, '../node_modules')],
    alias: {

      // 可以以缩写的名称更加方便的在其他模块引入常用模块
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),

      // 在给定对象的键后的末尾添加 $，表示精准匹配
      'vue$': 'vue/dist/vue.common.js',
      'URLS$': path.resolve(__dirname, '../src/apis/url.js')
    },

    // 设置解析器查找模块的目录，默认是npm使用npm下载的node_modules下
    // 现在会先去找plugins文件下，如果找不到，则会去node_modules目录下找
    // * modules: [path.resolve(__dirname,'plugins'), 'node_modules'],

    // 解析一个目录时,配置的文件将视为文件的入口文件 默认为index
    // 下面的代码如果设置在解析jquery的文件路径时，进入到jquery下的main.js 或者bower.js进行引用
    // * mainFiles: ['main', 'bower'],

    //  是否强制使用扩展名。如果为false时候，在解析一个文件，也会尝试匹配无扩展名的文件
    // * enforceExtension: false,

    //  模块后缀名，解析一个模块时，将会尝试附加这些后缀名
    //  moduleExtensions: ['-loader']
    
  },

  // webpack 构建时需要用到的多种创建方式
  plugins: [
    // webpack内置对象optimize用于对构建的文件进行优化，有两个方法
    // 分别是 CommonsChunkPlugin 和 UglifyJsPlugin
    // CommonsChunkPlugin 是js编译文件的模块提取
    // UglifyJsPlugin 是压缩js文件

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor-[hash].min.js'
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false
    //   }
    // })
  ],

  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
