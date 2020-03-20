// import webpack base modules
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var lessToJs = require('less-vars-to-js');

// import project modules
var package = require('../package.json');

// set project paths
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
const root = path.resolve(__dirname, '..');
const sourcePath = path.join(root, '/src');
const outPath = path.join(root, '/dist');
const PATHS = {
    common: path.join(sourcePath, '/common'),
    containers: path.join(sourcePath, '/containers'),
    reduxes: path.join(sourcePath, '/reduxes'),
    routes: path.join(sourcePath, '/routes'),
    schema: path.join(sourcePath, '/schema'),
    assets: path.join(sourcePath, '/assets')
};

// for ant style overrides
const themeVariables = lessToJs(fs.readFileSync(path.join(PATHS.assets, './style/ant-theme-vars.less'), 'utf8'));

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// loaders
const PostcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        plugins: [
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-preset-env')({
                //* use stage 2 features (defaults) */
                stage: 2
            }),
            require('postcss-reporter')(),
            require('postcss-browser-reporter')({
                disabled: isProduction
            })
        ]
    }
};


module.exports = (( process ) => {
    const isProd = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
    const mode = isProd ? 'production' : 'development';
    // const isBuild = !!env.build; // build vs dev-server
    const target = 'web';

    const devServer = {
        contentBase: sourcePath,
        hot: true,
        inline: true,
        historyApiFallback: {
            disableDotRule: true
        },
        headers: { // enable CORS
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        stats: 'minimal',
        clientLogLevel: 'warning'
    };

    const CssLoader = {
        loader: 'css-loader',
        query: {
            modules: true,
            sourceMap: !isProd,
            importLoaders: 1,
            // localIdentName: isProd ? '[hash:base64:5].css' : '[local]__[hash:base64:5].css'
            localIdentName: isProd ? '[hash:base64:5].css' : '[local]'
        }
    };

    const config = {
        mode,
        target,
        cache: true,
        devtool: isProd ? 'hidden-source-map' : 'cheap-module-eval-source-map',
        devServer,
        context: sourcePath,
        entry: {
          app: [
            './main.tsx',
          ],
        },
        output: {
            path: outPath,
            filename: isProd ? '[contenthash].js' : '[hash].js',
            chunkFilename: isProd ? '[name].[contenthash].js' : '[name].[hash].js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            // Fix webpack's default behavior to not load packages with jsnext:main module
            // (jsnext:main directs not usually distributable es6 format, but es6 sources)
            mainFields: ['module', 'browser', 'main'],
            alias: {
                common: PATHS.common,
                reduxes: PATHS.reduxes,
                containers: PATHS.containers,
                routes: PATHS.routes,
                schema: PATHS.schema,
                assets: PATHS.assets,
                '&': sourcePath
            }
        },
        module: {
            rules: [
                // typescript
                {
                    // Include ts, tsx, js, and jsx files.
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: require('../babelrc.json'),
                },
                // css
                {
                    test: /\.css$/,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        CssLoader,
                        // PostcssLoader,
                    ]
                },
                //less
                {
                    test: /\.less$/,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        CssLoader,
                        // PostcssLoader,
                        {
                            loader: 'less-loader',
                            options: {
                                modifyVars: themeVariables,
                                javascriptEnabled: true,
                            },
                        },
                        {
                            loader: 'style-resources-loader',
                            options: {
                                patterns: path.resolve(PATHS.assets, './style/global.less')
                            }
                    }
                    ]
                },
                // static assets
                // json
                {
                    test: /\.json$/,
                    include: [root],
                    use: { loader: 'json-loader' },
                },
                // images
                { test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000' },
                {
                    test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                    include: [PATHS.assets],
                    use: 'file-loader',
                    /*
                    options: {
                        name: '[path][hash].[ext]',
                    },
                    */
                },
                // fonts
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    include: [
                        PATHS.assets,
                    ],
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[hash].[ext]',
                        },
                    },
                },
            ]
        },
        optimization: {
            splitChunks: {
              name: true,
              cacheGroups: {
                  commons: {
                      chunks: 'initial',
                      minChunks: 2
                  },
                  vendors: {
                      test: /[\\/]node_modules[\\/]/,
                      chunks: 'all',
                      filename: isProd ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
                      priority: -10
                  }
              }
            },
            runtimeChunk: true
        },
        plugins: [
            ...[
                new webpack.EnvironmentPlugin({
                    NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
                    DEBUG: false
                })
            ],
            ...[
                new CleanWebpackPlugin(),
            ],
            ...[
                new MiniCssExtractPlugin({
                    filename: '[hash].css',
                    disable: !isProd
                }),
            ],
            ...[
                new HtmlWebpackPlugin({
                    template: './index.html.template',
                    minify: {
                        minifyJS: true,
                        minifyCSS: true,
                        removeComments: true,
                        useShortDoctype: true,
                        collapseWhitespace: true,
                        collapseInlineTagWhitespace: true
                    },
                    append: {
                        head: `<script src="//cdn.polyfill.io/v3/polyfill.min.js"></script>`
                    },
                    meta: {
                        title: package.name,
                        description: package.description,
                        keywords: Array.isArray(package.keywords) ? package.keywords.join(',') : undefined
                    }
                })
            ],
        ],
        node: {
            // workaround for webpack-dev-server issue
            // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
            fs: 'empty',
            net: 'empty'
        }
    };
    return config;
})(process);
