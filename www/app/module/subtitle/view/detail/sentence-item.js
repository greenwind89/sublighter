define([
    'jade!subtitle/template/detail/sentence-item',
    'jade!subtitle/template/detail/sentence-chosen-item',
    'subtitle/collection/word-in-chosen-sentence',
    'subtitle/view/detail/qualify-word'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/sentence-item'),
        chosenTpl= require('jade!subtitle/template/detail/sentence-chosen-item'),
        WordsInChosenSentenceCollection = require('subtitle/collection/word-in-chosen-sentence'),
        QualifyWordView = require('subtitle/view/detail/qualify-word');

    var Sentence = Backbone.View.extend({
        template: tpl,

        chosenSentenceTemplate: chosenTpl,

        events: {
            'click': 'handleClickOnSentence',
            'set-current':  'handleClickOnSentence'
        },

        className: 'sentence',

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        handleClickOnSentence: function() {
            if(this.model.get('isCurrent') === false) {
                this.model.collection.setCurrent(this.model);
            }
        },

        render: function() {

            if(this.model.get('isCurrent') === true) {
                var wordsInSentence = new WordsInChosenSentenceCollection(util.text.getWordsInSentence(this.model.get('content'))),
                    $content;

                this.$el.addClass('current');

                $('html, body').animate({
                    scrollTop: this.$el.offset().top - util.constants.NAVIGATOR_AND_HEADER_HEIGHT - 100
                }, 500);

                this.$el.html(this.chosenSentenceTemplate(this.model.toJSON()));

                $content = $('.content', this.$el);

                _.each(wordsInSentence.models, function(word) {
                    if(word.get('isQualify')) {

                        $content.append(' ');
                        $content.append(new QualifyWordView({model: word}).render().el);
                    } else {
                        $content.append(' ' + word.get('original'));
                    }

                }, this);
            } else {
                this.$el.removeClass('current');
                this.$el.html(this.template(this.model.toJSON()));
            }

            return this;
        }
    });

    return Sentence;
});

