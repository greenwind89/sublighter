define([
], function() { 
    'use strict';

    var Sentence = Backbone.Model.extend({
        defaults: {
            isCurrent        : false,
            content          : '',
            timeString       : '',
            startHour        : 0,
            startMinute      : 0,
            startSecond      : 0,
            startMillisecond : 0,
            timeStamp        : 0

        }
    });

    return Sentence;
});

