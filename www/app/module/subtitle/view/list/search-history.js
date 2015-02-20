define([
    'jade!subtitle/template/list/search-history',
    'subtitle/view/list/item',
    'subtitle/collection/subtitle'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/list/search-history');
    var ItemView = require('subtitle/view/list/item');
    var SubtitleCollection = require('subtitle/collection/subtitle');

    var SearchHistory = Backbone.View.extend({
        template: tpl,
        className: 'history',
        initialize: function() {
            this.subs = new SubtitleCollection();
        },
        render: function() {
            var that = this;
            var i = 1;

            this.$el.html(this.template());

            this.subs.fetch({
                success: function(subs) {
                    _.each(subs.models, function(sub) {
                        that.$el.prepend(new ItemView({
                            model: sub,
                            index: i
                        }).render().el); 
                        i++;
                    }, that);
                }
            });

            return this;
        }
    });

    return SearchHistory;
});

