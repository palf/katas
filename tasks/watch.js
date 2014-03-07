exports.config = {
    lint: {
        files: '<%= lint.source.src %>',
        tasks: [ 'lint' ]
    },
    unit: {
        files: '<%= lint.source.src %>',
        tasks: [ 'unit' ]
    }
};
