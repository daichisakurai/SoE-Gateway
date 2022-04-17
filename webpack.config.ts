const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'production',
  
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/index.tsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  module: {
    rules: [
      {
        // 拡張子 .ts の場合
        test: /\.tsx?$/,
        exclude: /node_modules/,
        // TypeScript をコンパイルする
        use: ['ts-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|svg|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      }
    ],
  },
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true
    //port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      //favicon: path.resolve(__dirname, 'src/favicon.ico'),
      filename: 'index.html'
    })
  ],
  performance: {
    hints: false
  }
};
