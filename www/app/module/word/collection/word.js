define([
    'word/model/word'
], function() { 
    'use strict';
    var Word = require('word/model/word');

    var WordCollection = Backbone.Collection.extend({
        model: Word,
        localStorage: new Backbone.LocalStorage(util.constants.WORD_TABLE_NAME),
    });

    return WordCollection;
});

