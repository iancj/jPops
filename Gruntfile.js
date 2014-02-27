module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //Js min task
        uglify: {
            jm: {
                files: {
                    'dist/jquery.jpops.min-v2.js': ['js/jquery.jpops-v2.js'],
                    'dist/jquery.jpops.min-v3.js': ['js/jquery.jpops-v3.js']
                }
            }
        },
        //Css min task
        cssmin: {
            cm: {
                files: {
                    'dist/jquery.jpops.min-v2.css': ['css/main-v2.css'],
                    'dist/jquery.jpops.min-v3.css': ['css/main-v3.css']
                }
            }
        },
        copy:{
            test:{
                files:[
                    {
                        expand: true,
                        cwd:'css/Images/',
                        src: ['**/*.*'], 
                        dest: 'dist/Images', 
                        filter: 'isFile'}
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
