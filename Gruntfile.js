module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: 'www/app/.jshintrc'
			},
			src: ['Gruntfile.js', 'www/app/module/**/*.js']
		},
		requirejs: {
			std: {
				options: {
					baseUrl: './www',
                    name: 'app',
                    out: './www/app/build/js/app-optimized.js',
					paths: {
						app: './app/setting/app',
					},
					// optimize: 'none',
					mainConfigFile: './www/app/setting/app.js',

				}
			}
        },
        less: {
            development: {
                options: {
                    paths: ['./app/theme']
                },
                files: {
                    './www/app/build/css/sublighter.css': './www/app/theme/less/bootstrap.less',
                }
            }

        }
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('require', ['requirejs']);
	grunt.registerTask('build', ['jshint', 'requirejs', 'less']);
	grunt.registerTask('hint', ['jshint']);
	grunt.registerTask('lessc', ['less']);

	grunt.registerTask('default', ['jshint']);
};
