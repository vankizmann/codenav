module.exports = function (grunt) {

// Load npm tasks
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');

// Project configuration.
grunt.initConfig({
    less: {
        development: {
            files: {
                "css/main.css": "less/main.less"
            }
        }
    },
    watch: {
        css: {
            files: [
                "less/*.less"
            ],
            tasks: ['less'],
            options: {
                livereload: false,
            }
        }
    }
});

// Default task(s).
grunt.registerTask('default', ['less', 'watch']);

};