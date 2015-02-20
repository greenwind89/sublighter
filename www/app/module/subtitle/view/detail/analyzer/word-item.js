define([
    'jade!subtitle/template/detail/analyzer/word-item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/analyzer/word-item')

    var WordItem = Backbone.View.extend({
        template: tpl,

        className: 'word-item',
        
        events: {
            'click': 'setCurrent'
        },

        setCurrent: function() {
            this.model.collection.setCurrent(this.model);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return WordItem;
});

