module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['./api/**/*.js', './entities/**/*.js', './public/js/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

};