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

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('oliver', 'Detect unused files in a require.js project', function() {

    var done = this.async();

    exec('JS_FILES=$(find $PWD -name *.js);for FILE in $JS_FILES; do short_name=`basename $FILE` && filename="${short_name%.*}" && git grep --quiet $filename 1>/dev/null && if [ "$?" == "1" ]; then echo "Should delete: $FILE"; fi; done;',
    // exec('ls',
        function(error, stdout, stderr) {
            console.log(arguments)
            grunt.log.writeln('stdout: ' + stdout);
            grunt.log.writeln('stderr: ' + stderr);
            if (error !== null) {
              grunt.log.writeln('exec error: ' + error);
            }

            done();
        }
    );

    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({
    //   punctuation: '.',
    //   separator: ', '
    // });

    // // Iterate over all specified file groups.
    // this.files.forEach(function(f) {
    //   // Concat specified files.
    //   var src = f.src.filter(function(filepath) {
    //     // Warn on and remove invalid source files (if nonull was set).
    //     if (!grunt.file.exists(filepath)) {
    //       grunt.log.warn('Source file "' + filepath + '" not found.');
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   }).map(function(filepath) {
    //     // Read file source.
    //     return grunt.file.read(filepath);
    //   }).join(grunt.util.normalizelf(options.separator));

    //   // Handle options.
    //   src += options.punctuation;

    //   // Write the destination file.
    //   grunt.file.write(f.dest, src);

    //   // Print a success message.
    //   grunt.log.writeln('File "' + f.dest + '" created.');
    // });
  });
};
