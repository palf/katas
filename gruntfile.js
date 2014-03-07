module.exports = function (grunt) {
	'use strict';

    var config = {
        lint: require('./tasks/lint').config,
        unit: require('./tasks/unit').config,
        watch: require('./tasks/watch').config
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.renameTask('jshint', 'lint');
    grunt.renameTask('nodeunit', 'unit');

    grunt.registerTask('default', ['lint', 'unit']);
};
