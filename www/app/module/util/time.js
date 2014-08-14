define([
], function() {
    'use strict';
    return {
       getTimeStamp: function(hour, minute, second) {
           return hour * 3600 + minute * 60 + second;
       }
    };
});
