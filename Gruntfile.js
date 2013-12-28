module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		manifest: grunt.file.readJSON('src/manifest.json'),
		copy: {
			main: {
				files: [
					{ src: 'src/manifest.json', dest: 'build/manifest.json' },
					{ src: 'src/jquery-1.10.2.min.js', dest: 'build/jquery-1.10.2.min.js' },
					{ src: 'src/main.js', dest: 'build/main.js' }
				]
			}
		},
		compress: {
			main: {
				options: {
					archive: "<%= manifest.name %>-<%= manifest.version %>.zip"
				},
				files: [
					{ expand: true, cwd: 'build/', src: ['**'], dest: '/' }
				]
			}
		},
		jshint: {
			main: {
				files: [ { src: 'src/**/*.js' } ]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress')
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['copy', 'compress'])
};
