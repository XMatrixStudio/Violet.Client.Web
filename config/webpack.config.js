'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const getClientEnvironment = require('./env')
const paths = require('./paths')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const loaders = require('./loaders')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const ManifestPlugin = require('webpack-manifest-plugin')

const PnpWebpackPlugin = require('pnp-webpack-plugin')
const fs = require('fs')
const resolve = require('resolve')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true'
// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false'

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  // Webpack uses `publicPath` to determine where the app is being served from.
  // In development, we always serve from the root. This makes config easier.
  const publicPath = isEnvProduction ? paths.servedPath : '/'
  // Some apps do not use client-side routing with pushState.
  // For these, "homepage" can be set to "." to enable relative asset paths.
  const shouldUseRelativeAssetPaths = publicPath === './'

  // `publicUrl` is just like `publicPath`, but we will provide it to our app
  // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
  // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
  const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : ''

  // Get environment variables to inject into our app.
  const env = getClientEnvironment(publicUrl)

  const cssFilename = 'static/css/[name].[contenthash:8].css'

  const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? // Making sure that the publicPath goes back to to build folder.
      { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {}

  return {
    mode: isEnvProduction ? 'production' : 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? shouldUseSourceMap
        ? 'source-map'
        : false
      : 'cheap-module-source-map',
    entry: {
      index: [
        // 兼容低版本浏览器
        // require.resolve('./polyfills'),
        // We ship a few polyfills by default:
        // of CSS changes), or refresh the page (in case of JS changes). When you // When you save a file, the client will either apply hot updates (in case // connect to WebpackDevServer by a socket and get notified about changes. // Include an alternative client for WebpackDevServer. A client's job is to
        // make a syntax error, this client will display a syntax error overlay.
        // Note: instead of the default WebpackDevServer client, we use a custom one
        // to bring better experience for Create React App users. You can replace
        // the line below with these two lines if you prefer the stock client:
        // require.resolve('webpack-dev-server/client') + '?/',
        // require.resolve('webpack/hot/dev-server'),
        isEnvDevelopment &&
          require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appIndexJs
      ].filter(Boolean),
      account: [
        // require.resolve('./polyfills'),
        isEnvDevelopment &&
          require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appAccountJs
      ].filter(Boolean),
      user: [
        // require.resolve('./polyfills'),
        isEnvDevelopment &&
          require.resolve('react-dev-utils/webpackHotDevClient'),
        paths.appUserJs
      ].filter(Boolean)
    },
    output: {
      // The build folder.
      path: isEnvProduction ? paths.appBuild : undefined,
      // changing JS code would still trigger a refresh
      // initialization, it doesn't blow up the WebpackDevServer client, and
      // We include the app code last so that if there is a runtime error during
      // Finally, this is your app's code:
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction
        ? 'static/js/[name].[chunkhash:8].js'
        : isEnvDevelopment && 'static/js/[name].bundle.js',
      chunkFilename: isEnvProduction
        ? 'static/js/[name].[chunkhash:8].chunk.js'
        : isEnvDevelopment && 'static/js/[name].chunk.js',
      publicPath: publicPath,
      // containing code from all our entry points, and the Webpack runtime.
      // served by WebpackDevServer in development. This is the JS bundle
      // This does not produce a real file. It's just the virtual path that is
      // There are also additional JS chunk files if you use code splitting.
      // This is the URL that app is served from. We use "/" in development.
      // Point sourcemap entries to original disk location (format as URL on Windows)
      devtoolModuleFilenameTemplate: isEnvProduction
        ? info =>
            path
              .relative(paths.appSrc, info.absoluteResourcePath)
              .replace(/\\/g, '/')
        : isEnvDevelopment &&
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'))
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      mobx: 'mobx',
      bizcharts: 'BizCharts',
      moment: 'moment',
      '@antv/data-set': 'DataSet'
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2
            },
            mangle: {
              safari10: true
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            }
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: shouldUseSourceMap
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap
              ? {
                  // `inline: false` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true
                }
              : false
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 1000,
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 1,
            priority: 10
          },
          antIcon: {
            test: /[\\/]@ant-design[\\/]icons[\\/]lib/,
            chunks: 'all',
            name: 'ant-design',
            priority: 20,
            enforce: true
          }
        }
      },
      // Automatically split vendor and commons
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: {
        name: 'runtime'
      }
    },
    resolve: {
      // This allows you to set a fallback for where Webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebookincubator/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        // It is guaranteed to exist because we tweak it in `env.js`
        process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ), // https://github.com/facebookincubator/create-react-app/issues/290 // some tools, although we do not recommend using it, see: // We also include JSX as a common component filename extension to support // These are the reasonable defaults supported by the Node ecosystem.
      // `web` extension prefixes have been added for better support
      // for React Native Web.
      extensions: paths.moduleFileExtensions.map(ext => `.${ext}`),
      alias: {
        '@': path.join(__dirname, '../src'),
        'react-native': 'react-native-web'
      },
      plugins: [
        // Adds support for installing with Plug'n'Play, leading to faster installs and adding
        // guards against forgotten dependencies and such.
        PnpWebpackPlugin, // please link the files into your node_modules/ and let module-resolution kick in. // To fix this, we prevent you from importing files out of src/ -- if you'd like to, // This often causes confusion because we only process files within src/ with babel. // Prevents users from importing files from outside of src/ (or node_modules/).
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
        new TsconfigPathsPlugin({
          configFile: paths.appTsConfig
        })
      ]
    },
    resolveLoader: {
      plugins: [
        // Also related to Plug'n'Play, but this time it tells Webpack to load its loaders
        // from the current package.
        PnpWebpackPlugin.moduleLoader(module)
      ]
    },
    module: {
      strictExportPresence: true,
      rules: [
        // TODO: Disable require.ensure as it's not a standard language feature.
        // We are waiting for https://github.com/facebookincubator/create-react-app/issues/2176.
        { parser: { requireEnsure: false } },

        {
          test: /\.(js|jsx|mjs)$/,
          loader: require.resolve('source-map-loader'),
          enforce: 'pre',
          include: paths.appSrc
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            loaders.urlLoader,
            loaders.jsLoader,
            loaders.tsLoader,
            isEnvDevelopment ? loaders.cssLoaderDev : loaders.cssLoaderProd,
            isEnvDevelopment ? loaders.scssLoaderDev : loaders.scssLoaderProd,
            isEnvDevelopment ? loaders.lessLoaderDev : loaders.lessLoaderProd,
            loaders.fileLoader
          ]
        }
      ]
    },
    plugins: [
      // Generates an `index.html` file with the <script> injected.
      // ** STOP ** Are you adding a new loader?
      // Make sure to add the new loader(s) before the "file" loader.
      new HtmlWebpackPlugin(
        Object.assign(
          {
            inject: true,
            chunks: ['index'],
            template: paths.appHtml
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      new HtmlWebpackPlugin(
        Object.assign(
          {
            inject: true,
            chunks: ['account'],
            template: paths.appHtml,
            filename: 'account.html'
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      new HtmlWebpackPlugin(
        Object.assign(
          {
            inject: true,
            chunks: ['user'],
            template: paths.appUserHtml,
            filename: 'user.html'
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true
                }
              }
            : undefined
        )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]), // In development, this will be an empty string. // a network request. // Inlines the webpack runtime script. This script is too small to warrant // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico"> // The public URL is available as %PUBLIC_URL% in index.html, e.g.: // Makes some environment variables available in index.html.

      isEnvProduction &&
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: cssFilename,
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
        }),

      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath
      }),

      isEnvProduction && new BundleAnalyzerPlugin(),

      isEnvProduction &&
        new WorkboxWebpackPlugin.GenerateSW({
          clientsClaim: true,
          exclude: [/\.map$/, /asset-manifest\.json$/],
          importWorkboxFrom: 'cdn',
          navigateFallback: publicUrl + '/index.html',
          navigateFallbackBlacklist: [
            // Exclude URLs starting with /_, as they're likely an API call
            new RegExp('^/_'),
            // Exclude URLs containing a dot, as they're likely a resource in
            // public/ and not a SPA route
            new RegExp('/[^/]+\\.[^/]+$')
          ]
        }),

      new ModuleNotFoundPlugin(paths.appPath),

      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw), // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`. // Makes some environment variables available to the JS code, for example: // new webpack.NamedModulesPlugin(), // Add module names to factory functions so they appear in browser profiler.
      // new webpack.DefinePlugin(env.stringified),
      // This is necessary to emit hot updates (currently CSS only):
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(), // See https://github.com/facebookincubator/create-react-app/issues/186 // See https://github.com/facebookincubator/create-react-app/issues/240 // a plugin that prints an error when you attempt to do this. // Watcher doesn't work well if you mistype casing in a path so we use // makes the discovery automatic so you don't have to restart. // to restart the development server for Webpack to discover it. This plugin // If you require a missing module and then `npm install` it, you still have
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.appNodeModules), // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack // solution that requires the user to opt into importing specific locales. // by default due to how Webpack interprets its code. This is a practical // Moment.js is an extremely popular library that bundles large locale files

      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new ForkTsCheckerWebpackPlugin({
        // Perform type checking and linting in a separate process to speed up compilation
        async: true,
        checkSyntacticErrors: true,
        watch: paths.appSrc,
        tsconfig: paths.appTsConfig,
        tslint: paths.appTsLint,
        useTypescriptIncrementalApi: true
      })
      // isEnvDevelopment && new HardSourceWebpackPlugin()
    ].filter(Boolean),
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  } // cumbersome. // Tell Webpack to provide empty mocks for them so importing them works. // Some libraries import Node modules but don't use them in the browser. // splitting or minification in interest of speed. These warnings become // Turn off performance hints during development because we don't do any
}
