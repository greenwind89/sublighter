define([
    'subtitle/collection/sentence'
], function() { 
    'use strict';
    var Sentences = require('subtitle/collection/sentence');

    var Subtitle = Backbone.Model.extend({
        gotoDetail: function() {
            window.location = '#subtitle/detail/' + this.get('providerMovieId');
        },

        getSentences: function() {
            var sentences;
            if(!this.get('sentences')) {
                this.set('sentences', new Sentences(util.text.parseSubtitleToSentences(this.get('content'))));
            }

            return this.get('sentences');
        }
    });

    return Subtitle;
});

