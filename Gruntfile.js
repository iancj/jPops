module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Js min task
        uglify: {
            comm_v1: {
                files: {
                    'dist/jquery.jpops.min.js': ['js/jquery.jpops.js']
                }
            }
        },
        //Css min task
        cssmin: {
            comm_v1: {
                files: {
                    'dist/jquery.jpops.min.css': ['css/main-fx.css']
                }
            }
        },
        copy:{
            test:{
                files:[
                    {expand: true, src: ['Images/*'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        }
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // resgister tasks
    grunt.registerTask('default', ['uglify', 'cssmin','copy']);

};
