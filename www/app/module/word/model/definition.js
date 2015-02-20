define([
], function() { 
    'use strict';

    var Definition = Backbone.Model.extend({
        defaults: {
            word: '',
            content: ''
        },

        getWord: function() {
            return this.get('word');
        },

        getContent: function() {
            return this.get('content');
        }
    });

    return Definition;
});

