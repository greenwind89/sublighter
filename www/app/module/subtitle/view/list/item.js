define([
    'jade!subtitle/template/list/item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/list/item');
    var classes = [];

    var ItemView = Backbone.View.extend({
        template: tpl,
        className: function() {
            return classes.join(' ');
        },
        events: {
            'click': 'gotoDetail'
        },
        initialize: function(params) {
            classes = ['history-item'];

            if(params.index && params.index % 2 === 0) {
                classes.push('even'); 
            }

            if(params.index && params.index % 2 !== 0) {
                classes.push('odd'); 
            }
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

