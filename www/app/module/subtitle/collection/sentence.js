define([
    'subtitle/model/sentence'
], function() { 
    'use strict';
    var Sentence = require('subtitle/model/sentence'),
        currentSentence = null;

    var Sentences = Backbone.QueryCollection.extend({
        model: Sentence,

        totalTime: 0,


        initialize: function() {
            this.on('reset', function() { 
                this.totalTime = this.last() ? this.last().get('timeStamp') : 0;
            }, this);
        },
        
        setCurrent: function(sentence) {
            if(currentSentence) { // remove previous current
                currentSentence.set('isCurrent', false);
            }

            sentence.set('isCurrent', true); // update new current sentence

            currentSentence = sentence; // update internal data

            this.trigger('current-change');
            return this;
        },

        getCurrent: function() {
            return currentSentence;
        },

        getClosestByTime: function(hour, minute, second, isBackward) {
            var timeStamp = util.time.getTimeStamp(hour, minute, second),
                result;

            if(isBackward) {
                timeStamp = this.totalTime - timeStamp;
            }

            result = this.query({
                'timeStamp': {$gte: timeStamp}
            }, {
                limit: 1
            });

            return result.length > 0 ? result[0] : this.last();
        },

        onAddANewModel: function() {
        }

    });

    return Sentences;
});

