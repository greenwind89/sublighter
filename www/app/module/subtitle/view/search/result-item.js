define([
    'jade!subtitle/template/search/result-item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/search/result-item');

    var ResultItem = Backbone.View.extend({
        className: 'list-group-item',

        events: {
            'click': 'handleClick'
        },

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        tagName: 'div',

        template: tpl,

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        handleClick: function() {
            core.global.cachedSubtitles.createIfNotExistFromSearchResult(this.model).done(function(subtitle) { 
                // console.log(subtitle);
                subtitle.gotoDetail();
            });
            // this.model.set('status', 'downloading');
        }
    });

    return ResultItem;
});

