define([
    'subtitle/model/sentence'
], function() { 
    'use strict';
    var Sentence = require('subtitle/model/sentence');

    var Sentences = Backbone.Collection.extend({
        model: Sentence
    });

    return Sentences;
});

