module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		manifest: grunt.file.readJSON('src/manifest.json'),
		compress: {
			main: {
				options: {
					archive: "<%= manifest.name %>-<%= manifest.version %>.zip"
				},
				files: [
					{ expand: true, cwd: 'src/', src: ['**'], dest: '/' }
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('default', ['compress']);
};
