define([
    'jade!subtitle/template/detail/qualify-word'
], function() { 
    'use strict';

    var tpl = require('jade!subtitle/template/detail/qualify-word')

    var QualifyWord = Backbone.View.extend({
        template: tpl,
        tagName: 'span',
        className: 'qualify-word',

        events: {
            'click': 'handleClickOnWord'
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        handleClickOnWord: function() {
            util.observer.trigger('view-definition', this.model.get('rootWord'));
        }
    });

    return QualifyWord;
});

