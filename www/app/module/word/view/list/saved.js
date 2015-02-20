define([
    'jade!word/template/list/saved',
    'word/view/list/saved-item'
], function() { 
    'use strict';

    var tpl = require('jade!word/template/list/saved');
    var SavedItemView = require('word/view/list/saved-item');

    var SavedWordsList = Backbone.View.extend({
        template: tpl,
        className: 'list-group',
        render: function() {
            this.$el.html(this.template());

            // _.each(core.global.savedDefs.models, function(def) {
            //     this.$el.append(new SavedItemView({
            //         model: def
            //     }).render().el); 
            // }, this);

            return this;
        }
    });

    return SavedWordsList;
});

