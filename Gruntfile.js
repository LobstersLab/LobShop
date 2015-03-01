'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-retire');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            test: {
                src: ['server/tests/**/*.js']
            }
        },
        nodemon: {
            dev: {
                script: 'app',
                options: {
                    ignore: [
                        'node_modules/**',
                        'public/**'
                    ]
                }
            }
        },
        env: {
            options: {
                //Shared Options Hash
            },
            development: {
                NODE_ENV: 'development',
                PORT: 3310
            },
            production: {
                NODE_ENV: 'production',
                PORT: 3000
            },
            testing: {
                NODE_ENV: 'testing',
                PORT: 3310
            }
        },
        shell: {
            // If you want to use some bash script with a grunt command use this option
            // build: {
            //     command: ''
            // }
        },
        retire: {
            js: ['public/*'], /** Which js-files to scan. **/
            node: ['./'], /** Which node directories to scan (containing package.json). **/
            options: {

            }
        }
    });

    grunt.registerTask('default', ['env:development', 'nodemon']);
    grunt.registerTask('production', ['env:production', 'nodemon']);
    grunt.registerTask('test', ['env:testing', 'mochaTest']);
    grunt.registerTask('retire-modules', ['retire']);
};