require.config({
	baseUrl : './',
	packages : [ 
        {
            name : 'core',
            location : './app/module/core'
        },
        {
            name : 'util',
            location : './app/module/util'
        },
        {
            name : 'subtitle',
            location : './app/module/subtitle'
        },
        {
            name : 'word',
            location : './app/module/word'
        },
        {
            name : 'test',
            location : './app/module/test'
        },
    ],
	paths : {
		jade : './vendor/require-jade/jade',
        pako : './vendor/pako/dist/pako'
	},
});


var packages = [
    'subtitle',
    'word',
    'test'
];


require(['util'], function() { // moment and utils will be global
    require(['core'], function() {
        require(packages, function() {
            Backbone.history.start();
        });
    });
			
});

// initialize fast click
$(function() {
    FastClick.attach(document.body);
});

