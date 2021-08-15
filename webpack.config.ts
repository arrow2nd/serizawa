import { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isDevelop = process.env.NODE_ENV === 'development'

// 共通設定
const base: Configuration = {
  mode: isDevelop ? 'development' : 'production',
  experiments: {
    asset: true
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelop
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', 'json']
  },
  devtool: isDevelop ? 'inline-source-map' : false
}

// main.ts
const main: Configuration = {
  ...base,
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, 'src', 'main.ts')
  }
}

// preload.ts
const preload: Configuration = {
  ...base,
  target: 'electron-preload',
  entry: {
    preload: path.resolve(__dirname, 'src', 'preload.ts')
  }
}

// renderer.ts
const renderer: Configuration = {
  ...base,
  target: 'web',
  entry: {
    renderer: path.resolve(__dirname, 'src', 'renderer.tsx')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      inject: 'body',
      scriptLoading: 'blocking',
      minify: !isDevelop
    }),
    new MiniCssExtractPlugin()
  ]
}

export default [main, preload, renderer]
