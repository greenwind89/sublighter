define([
], function() { 
    'use strict';

    var WordInChosenSentence = Backbone.Model.extend({
        defaults: {
            original: '',
            rootWord: '',
            isQualify: false
        }
    });

    return WordInChosenSentence;
});

