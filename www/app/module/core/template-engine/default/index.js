define([
    'jade!core/template-engine/default/index'
], function() { 
    'use strict';
    
    var tpl = require('jade!core/template-engine/default/index');

    var IndexView = Backbone.View.extend({
        template: tpl,
        render: function() {
            this.$el.html(this.template());
            return this;
        },


    });

    var indexView = new IndexView();

    return {
        getTemplate: function() {
            return indexView.render().el;
        },

        setMainPage: function(view) {
            $('#main', indexView.$el).html(view.render().el);
        }
    };
});

