module.exports = function(grunt){

    //const sass = require('node-sass');
    grunt.initConfig({
        
        // Concatenate files
        concat: {
            options:{
                seperator: '\n\n//------------------------------------------\n',
                banner: '\n\n//------------------------------------------\n'
            },
            dist:{
                src:['components/scripts/*.js'],
                dest:'builds/development/js/script.js'
            }
        },

        // Inject Bower packages into our source code with Grunt
        wiredep: {
            task: {
              src: 'builds/development/**/*.html'
            }
        },        

        // Either user wiredep or this one
        /*bower_concat:{
            all:{
                dest: 'builds/development/js/_bower.js',
                cssDest: 'builds/development/css/_bower.css'
            }
        },*/

        sass: {
            dist: {
              options: {
                style: 'expanded'
              },
              files : [{
                src: 'components/sass/resume.scss',
                dest: 'builds/development/css/style.css'
              }]
            }
          },

        /*sass: {
            dist: {
                
                files: {
                    'builds/development/css/style.css': 'components/sass/resume.scss'
                }
            }
        },*/

        /*sass: {
            options: {
                style: 'expanded'
            },
            dist: {
                files: {
                    'builds/development/css/style.css': 'components/sass/resume.scss'
                }
            }
        },*/

        // Start a connect web server
        connect:{
          server:{
            options:{
              hostname: 'localhost',
              port: 8000,
              base: 'builds/development/index.html',
              livereload:true
            }
          }
        }, 

        // Run predefined tasks whenever watched file patterns are added, changed or deleted
        watch: {
            options: {
                spawn: false,
                livereload: true,
            },
            scripts: {
                files: ['builds/development/**/*.html',
                'components/scripts/**/*.js',
                'components/sass/**/*.scss'],
                tasks: ['concat', 'sass']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-wiredep');
    //grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'wiredep', 'sass', 'connect', 'watch']);

}
