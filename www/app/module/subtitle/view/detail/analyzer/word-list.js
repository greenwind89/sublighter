define([
    'jade!subtitle/template/detail/analyzer/word-list',
    'subtitle/view/detail/analyzer/word-item'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/analyzer/word-list');
    var WordView = require('subtitle/view/detail/analyzer/word-item');

    var WordList = Backbone.View.extend({
        template: tpl,
        initialize: function() {
            this.collection.on('add', function(model) {
                this.appendOneWord(model);
            }, this);
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        },
        appendOneWord: function(word) {
            this.$el.append(new WordView({
                model: word
            }).render().el);
        }
    });

    return WordList;
});

