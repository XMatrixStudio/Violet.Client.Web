const paths = require('./paths')
const tsImportPluginFactory = require('ts-import-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const autoprefixer = require('autoprefixer')({
  browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9' // React doesn't support IE8 anyway
  ],
  flexbox: 'no-2009'
})

const precss = require('precss')()
const flexBugFixes = require('postcss-flexbugs-fixes')()

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './'
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css'

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {}

// "url" loader works like "file" loader except that it embeds assets
// smaller than specified limit in bytes as data URLs to avoid requests.
// A missing `test` is equivalent to a match.
const urlLoader = {
  test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'static/media/[name].[hash:8].[ext]'
  }
}

const importPluginOption = [
  {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  },
  {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: true
  }
]

// js loader
const jsLoader = {
  test: /\.(js|jsx|mjs)$/,
  include: paths.appSrc,
  loader: require.resolve('babel-loader'),
  options: {
    compact: true
  }
}

// ts loader
const tsLoader = {
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
  use: [
    {
      loader: require.resolve('ts-loader'),
      options: {
        transpileOnly: true
        //happyPackMode: true,
        // getCustomTransformers: () => ({
        //   before: [tsImportPluginFactory(importPluginOption)]
        // })
      }
    }
  ]
}

const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    // don't need now
    // ident: 'postcss',
    plugins: () => [flexBugFixes, autoprefixer]
  }
}

const precssLoader = {
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    // don't need now
    // ident: 'postcss',
    plugins: () => [precss, flexBugFixes, autoprefixer]
  }
}

const rawCssLoaderDev = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1
  }
}

const rawCssLoaderProd = {
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    sourceMap: shouldUseSourceMap
  }
}

const cssLoaderDev = {
  test: /\.css$/,
  use: [require.resolve('style-loader'), rawCssLoaderDev, postcssLoader]
}

const cssLoaderProd = {
  test: /\.css$/,
  loader: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: extractTextPluginOptions
    },
    rawCssLoaderProd,
    postcssLoader
  ]
  // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
}

// scss loader
const scssLoaderDev = {
  test: /\.scss$/,
  use: [require.resolve('style-loader'), rawCssLoaderDev, precssLoader]
}

const scssLoaderProd = {
  test: /\.scss$/,
  loader: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: extractTextPluginOptions
    },
    rawCssLoaderProd,
    precssLoader
  ]
}

// less loader
const lessLoaderDev = {
  test: /\.less$/,
  use: [
    require.resolve('style-loader'),
    rawCssLoaderDev,
    postcssLoader,
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': 'rgba(76, 194, 200, 0.774)'
        }
      }
    }
  ]
}

const lessLoaderProd = {
  test: /\.less$/,
  loader: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: extractTextPluginOptions
    },
    rawCssLoaderProd,
    postcssLoader,
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        modifyVars: {
          '@primary-color': 'rgba(76, 194, 200, 0.774)'
        }
      }
    }
  ]
}

// Exclude `js` files to keep "css" loader working as it injects
// it's runtime that would otherwise processed through "file" loader.
// Also exclude `html` and `json` extensions so they get processed
// by webpacks internal loaders.
const fileLoader = {
  loader: require.resolve('file-loader'),
  // Exclude `js` files to keep "css" loader working as it injects
  // it's runtime that would otherwise processed through "file" loader.
  // Also exclude `html` and `json` extensions so they get processed
  // by webpacks internal loaders.
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  options: {
    name: 'static/media/[name].[hash:8].[ext]'
  }
}

module.exports = {
  urlLoader,
  jsLoader,
  tsLoader,
  cssLoaderDev,
  cssLoaderProd,
  scssLoaderDev,
  scssLoaderProd,
  lessLoaderDev,
  lessLoaderProd,
  fileLoader,
  postcssLoader
}