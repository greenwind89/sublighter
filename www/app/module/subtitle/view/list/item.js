define([
    'jade!subtitle/template/list/item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/list/item');

    var ItemView = Backbone.View.extend({
        template: tpl,
        className: 'list-group-item',
        events: {
            'click': 'gotoDetail'
        },

        gotoDetail: function() {
            this.model.gotoDetail();
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return ItemView;
});

