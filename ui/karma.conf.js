module.exports = function(config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-route/angular-route.js',

            'node_modules/socket.io-client/socket.io.js',


            'node_modules/karma-read-json/karma-read-json.js',
            'src/js/main.js',
            'src/**/!(bundle-node-modules).js',
            'test/**/*.spec.js',

            // fixtures
            {pattern: 'test/mock/*.json', watched: true, served: true, included: false}
        ],

        preprocessors: {
            'src/**/*.js':  ['browserify'],
            'test/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [
                ['babelify', {
                    plugins: ['babel-plugin-espower'],
                    presets: ['es2015']
                }]
            ]
        },

        exclude: [],

        browsers: [
            // 'Chrome',
            'PhantomJS'
        ],

        singleRun: false,

        colors: true,

        logLevel: config.LOG_INFO,

        reporters: ['progress']
    });
};