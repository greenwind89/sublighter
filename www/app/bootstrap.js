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
    ],
	paths : {
		jade : './vendor/require-jade/jade',
	},
});


var packages = [
    'subtitle'
];


require(['util'], function() { // moment and utils will be global
    require(['core'], function() {
        require(packages, function() {
            Backbone.history.start();
        });
    });
			
});

