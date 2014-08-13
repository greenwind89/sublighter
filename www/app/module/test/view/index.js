define([
    'jade!test/template/index',
    'test/collection/suite',
    'test/view/item'
], function() { 
    'use strict';

    var tpl = require('jade!test/template/index'),
        TestSuiteCollection = require('test/collection/suite'),
        ItemView = require('test/view/item');

    var IndexView = Backbone.View.extend({
        template: tpl,

        testSuitesHolder: '#test-suites-holder',

        initialize: function() {
            this.testSuites = new TestSuiteCollection([
                {
                    name: 'Test Text Utilities',
                    path: 'test/testcase/util/text'
                },
            ]);
            
        },
        
        render: function() {
            this.$el.html(this.template({
            }));

            this.$testSuitesHolder = $(this.testSuitesHolder, this.$el);

            _.each(this.testSuites.models, function(suite) {
                this.$testSuitesHolder.append(new ItemView({model: suite}).render().el);
            }, this);

            
            return this;
        }
    });

    return IndexView;
});

