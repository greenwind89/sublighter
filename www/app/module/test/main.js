define([
    'test/view/index'
], function() {
    'use strict';

    var IndexView = require('test/view/index');

    core.router.route('test', function(id) {
        $('body').html(new IndexView({}).render().el);
        mocha.setup('bdd');
        // require(['./app/test/definition'], function() {
        //     if (window.mochaPhantomJS) {
        //         mochaPhantomJS.run(); 
        //     } else {
        //         mocha.run(); 
        //     }
        // });

    });

});
