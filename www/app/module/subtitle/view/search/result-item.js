define([
    'jade!subtitle/view/search/result-item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/view/search/result-item');

    var ResultItem = Backbone.View.extend({
        className: 'list-group-item',

        tagName: 'a',

        template: tpl,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return ResultItem;
});

