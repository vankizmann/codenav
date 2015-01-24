module.exports = function (grunt) {

// Load npm tasks
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');

// Project configuration.
grunt.initConfig({
    less: {
        development: {
            files: {
                "css/font-awesome.css": "bower_components/font-awesome/less/font-awesome.less",
                "css/kube.css": "bower_components/kube-framework/less/kube.less",
                "css/main.css": "less/main.less"
            }
        }
    },
    watch: {
        css: {
            files: [
                "bower_components/font-awesome/less/*.less",
                "bower_components/kube-framework/less/*.less",
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