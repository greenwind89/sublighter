define([
    'jade!subtitle/template/search/result-item',
    'subtitle/model/subtitle'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/search/result-item');
    var Subtitle = require('subtitle/model/subtitle');

    var ResultItem = Backbone.View.extend({
        className: 'search-result-item',

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
            var that = this;
            core.db.get(util.constants.SUBTITLE_TABLE_NAME).done(function(subs) {
                var sub = subs.findWhere({
                    providerMovieId: that.model.get('providerMovieId')
                });

                if(!sub) {
                    that.model.downloadSubtitle().done(function(content) {
                        sub = new Subtitle(that.model.toJSON());
                        sub.set('content', content);
                        sub.set('title', that.model.get('moviewUploadedName'));
                        sub.save();
                        sub.gotoDetail();
                    });
                } else {
                    sub.gotoDetail();
                }

            });
        }
    });

    return ResultItem;
});

