module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		js: function() {
			var files = [];
			grunt.file.recurse('src/', function(abs, root, sub, file) {
				files.push((sub != null) ? sub + '/' + file : file);
				console.log("Ham " + file);
			});
			return files;
		},
		concat: {
			options: {
				process: true
			},
			header: {
				options: {
					banner: '// ==UserScript==\n\
// @name        <%= pkg.name %>\n\
// @namespace   http://thekreml.in\n\
// @version     <%= pkg.version %>\n\
<% _.forEach(pkg.manifest.matches, function(match) { %>\
// @match       <%= match %>\n\
<% }); %>\
// ==/UserScript==\n\n'
				},
				src: [ 'src/main.js' ],
				dest: 'dist/main.js'
			},
			manifest: {
				options: {
					banner: '{\n\
	"name": "<%= pkg.name %>",\n\
	"version": "<%= pkg.version %>",\n\
	"manifest_version": 2,\n\
	"description": "Add a \'Random Episode\' button to Netflix Watch Instantly pages.",\n\
	"content_scripts": [ {\n\
		"js": [\n\
<% _.forEach(js(), function(file) { %>\
			"<%= file %>",\n\
<% }); %>\
		],\n\
		"matches": [\n\
<% _.forEach(pkg.manifest.matches, function(match) { %>\
			"<%= match %>"\n\
<% }); %>\
		]\n\
	} ],\n\
	"icons": { "128": "icon.png" }\n\
}\n'
				},
				src: [ 'src/manifest.json' ],
				dest: 'dist/manifest.json'
			}
		},
		compress: {
			dist: {
				options: {
					archive: "<%= pkg.name %>-<%= pkg.version %>.zip"
				},
				files: [
					{ expand: true, cwd: 'dist/', src: ['**'], dest: '/' },
					{ expand: true, cwd: 'src/', src: ['*/*.js'], dest: '/' },
					{ expand: true, cwd: 'src/', src: ['*.png'], dest: '/' },
					{ src: ['lib/**'], dest: '/' }
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.registerTask('default', ['concat', 'compress']);
};
