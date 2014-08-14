define([
    'jade!subtitle/template/detail/index',
    'subtitle/view/detail/sentence-list'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/index'),
        SentenceListView = require('subtitle/view/detail/sentence-list');

    var DetailIndex = Backbone.View.extend({
        template: tpl,
        render: function() {

            this.$el.html(this.template());
            this.renderSentence();

            return this;
        },

        renderSentence: function() {
            var sentenceListView = new SentenceListView({
                collection: this.model.getSentences()
            });

            $('#sentence-list-holder', this.$el).html(sentenceListView.render().el);
        }
    });

    return DetailIndex;
});

