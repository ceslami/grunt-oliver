/*
 * grunt-oliver
 * https://github.com/ceslami/oliver
 *
 * Copyright (c) 2015 Cyrus Eslami
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;

module.exports = function(grunt) {

    function findOrphansInPath(path, callback) {
        exec('./tasks/crawl.sh ' + path, {
            cwd: process.cwd()
        }, function(error, stdout, stderr) {

            if (stderr) {
                return grunt.log.error('Error: ' + stderr);
            }

            if (error !== null) {
                return grunt.log.error('Error: ' + error);
            }

            if (stdout) {
                return grunt.log.error(stdout)
            }

            grunt.log.writeln('Success: no orphan files found in `' + path + '`.');
            done();
        });
    }

    grunt.registerMultiTask('oliver', 'Detect unused files in a require.js project', function(pathArg) {

        var path = pathArg || this.data.path,
            done = this.async();

        if (!path) {
            return grunt.log.error('Error: a path was not specified.');
        }

        findOrphansInPath(path, done);
    });
};
