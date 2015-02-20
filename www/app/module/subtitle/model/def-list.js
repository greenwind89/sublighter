define([
    'subtitle/model/word-in-analyzer'
], function() { 
    'use strict';
    var Word = require('subtitle/model/word-in-analyzer');

    var DefList = Backbone.Model.extend({
        defaults: {
            word: new Word()
        }
    });

    return DefList;
});

