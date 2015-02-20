define([
    'jade!subtitle/template/detail/index',
    'subtitle/view/detail/sentence-list',
    'subtitle/view/detail/navigator',
    'subtitle/view/detail/analyzer'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/index'),
        SentenceListView = require('subtitle/view/detail/sentence-list'),
        NavigatorView = require('subtitle/view/detail/navigator'),
        AnalyzerView = require('subtitle/view/detail/analyzer');

    var DetailIndex = Backbone.View.extend({
        template: tpl,
        render: function() {

            this.$el.html(this.template());
            this.renderSentences();

            this.renderNavigator();
            this.renderAnalyzer();
            
            core.templateEngine.setTitle(this.model.get('title'));

            return this;
        },

        renderSentences: function() {
            var sentenceListView = new SentenceListView({
                collection: this.model.getSentences()
            });

            $('#js-sentence-list-holder', this.$el).html(sentenceListView.render().el);
        },

        renderNavigator: function() {
            $('#js-navigator-holder', this.$el).html(new NavigatorView({
                model: this.model
            }).render().el);
        },

        renderAnalyzer: function() {
            $('#js-analyzer-holder', this.$el).html(new AnalyzerView({
                model: this.model
            }).render().el);

        }
    });

    return DetailIndex;
});

