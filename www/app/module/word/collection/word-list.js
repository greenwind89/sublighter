define([
    'word/model/word-list'
], function() { 
    'use strict';
    var WordList = require('word/model/word-list');

    var WordLists = Backbone.Collection.extend({
        model: WordList,
        localStorage: new Backbone.LocalStorage(util.constants.WORD_LIST_TABLE_NAME),
    });

    return WordLists;
});

