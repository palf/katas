exports.config = {
    options: {
        node: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
            jQuery: true
        }
    },
    gruntfile: {
        src: 'gruntfile.js'
    },
    lib_test: {
        src: [
            'lib/**/*.js',
            'test/**/*.js',
            'tasks/**/*.js'
        ]
    }
};
