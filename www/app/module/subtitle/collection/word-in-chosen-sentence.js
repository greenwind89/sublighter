define([
    'subtitle/model/word-in-chosen-sentence'
], function() { 
    'use strict';

    var WordInChosenSentenceModel = require('subtitle/model/word-in-chosen-sentence');

    var WordInChosenSentence = Backbone.Collection.extend({
        model: WordInChosenSentenceModel
    });

    return WordInChosenSentence;
});

