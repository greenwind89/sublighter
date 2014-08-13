define([
    'jade!test/template/item'
], function() { 
    'use strict';

    var tpl = require('jade!test/template/item');

    var TestItem = Backbone.View.extend({
        template: tpl,

        tagName: 'li',

        className: 'test-list-group-item',
        
        events: {
            'click .js-run-btn': 'runTest'
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        runTest: function() {
            $('#mocha').html('');

            require([this.model.get('path')], function() {
                if (window.mochaPhantomJS) {
                    mochaPhantomJS.run(); 
                } else {
                    mocha.run(); 
                }
            });
        }
    });

    return TestItem;
});

