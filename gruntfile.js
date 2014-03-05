module.exports = function (grunt) {
	'use strict';

    var config = {
        jshint: require('./tasks/lint').config,
        nodeunit: require('./tasks/unit').config,
        watch: require('./tasks/watch').config
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'nodeunit']);
};
