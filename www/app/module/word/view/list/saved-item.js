define([
    'jade!word/template/list/saved-item'
], function() { 
    'use strict';

    var tpl = require('jade!word/template/list/saved-item')

    var view = Backbone.View.extend({
        template: tpl,
        className: 'list-group-item',
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return view;
});

